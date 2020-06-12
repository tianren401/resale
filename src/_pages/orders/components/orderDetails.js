import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { H2, H4, H5, Loader, FlexItem, Flex } from '_components';
import { colors, deviceSize } from '_constants';
import { getOrderDetailsAction } from '_store/orders';
import { useViewport } from '_hooks';
import { useParams } from 'react-router-dom';
import {
  StyledDetailsBackground,
  TicketDetailsContainer,
  StyledDetailsHeader,
} from './styledComponents';
import seatMockImage from '_images/seatMock.png';
import eventTicketMockImage from '_images/eventTicketMock.png';

import { DownloadIcon } from '_components/icon/svgIcons';
import { Footer } from '_pages/home/footer';

const SectionContainer = styled(Flex)`
  background: ${colors.white};
  border: 2px solid rgba(103, 38, 241, 0.16);
  box-sizing: border-box;
  border-radius: 8px;
  min-height: ${({ minHeight }) => (minHeight ? 'minHeight' : '120px')};
  padding: 20px;
  flex: 6;

  @media (max-width: ${deviceSize.tablet}px) {
    width: 100%;
    padding: 20px;
    background: white;
    flex-direction: column;
  }
`;

const MainTitle = styled(H2)`
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;
  color: ${colors.black};
  position: absolute;
  bottom: 11px;

  @media (max-width: ${deviceSize.tablet}px) {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    margin-top: 0;
  }
`;

const SectionTitle = styled(H5)`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${colors.darkGray};
  text-align: left;
  margin-top: 23px;
  flex: 1;

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const MainInfo = styled(H5)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.black};
  text-align: left;
`;

const AddressInfo = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${colors.black};
  flex: 1;
`;

const Text = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${colors.darkGray};
  flex: 1;

  > a {
    padding-left: 12px;
  }
`;

const StyledLink = styled.a`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.brand};
`;

const Title = styled(H4)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  padding-right: 16px;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  > div {
    margin-top: 20px;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 120px;
    margin-top: 0;
    width: 100%;
  }
`;

const ImagesContainer = styled(Flex)`
  width: 100%;
  flex-direction: row;
  margin-top: 18px;

  > div:nth-child(odd) {
    margin-right: 20px;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    flex-direction: column;
    > div:nth-child(odd) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
`;

const SectionImage = styled.div`
  height: ${(props) => (props.height ? props.height : '130px')};
  width: ${(props) => (props.width ? props.width : '100%')};
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => props.backgroundImage};
  ${({ hasShadow }) =>
    hasShadow &&
    `
  box-shadow: 0px 2px 4px rgba(24, 26, 29, 0.15), 0px 0px 1px rgba(130, 136, 148, 0.16);
  `}
`;

const IconContainer = styled.div`
  padding-left: 0;
  margin-right: 11px;
`;

const StyledOrderId = styled(FlexItem)`
  margin-top: 30px;
  flex: 6;
`;

const getUrlParameter = (location, name) => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const OrderDetails = (props) => {
  const windowSize = useViewport();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const authState = useSelector(({ authReducer }) => authReducer);
  const isAuthorized = !!authState.user;

  const isMobileDevice = windowSize.width < deviceSize.tablet;
  const handleFetchOrder = useCallback(() => {
    if (!isAuthorized) {
      const email = getUrlParameter(props.location, 'email');
      const phone = getUrlParameter(props.location, 'phone');
      dispatch(getOrderDetailsAction({ orderId, email, phone }));
    } else {
      dispatch(getOrderDetailsAction({ orderId }));
    }
  }, [dispatch, orderId, isAuthorized, props.location]);

  useEffect(() => {
    handleFetchOrder();
  }, [handleFetchOrder]);

  const { loading, rejected } = useSelector((state) => state.ordersReducer);
  const { currentOrder } = useSelector((state) => state.ordersReducer);

  useEffect(() => {
    if (rejected) {
      window.location.href = '/';
    }
  }, [rejected]);

  if (!currentOrder) {
    return null;
  }

  const {
    event: { event, images, directionsUrl },
    section,
    row,
    highSeat,
    ticketsUrl,
  } = currentOrder;

  const {
    venue: { name: venueName, city, state },
  } = event;

  const eventImages = (images || []).reduce(
    (acc, image) => ({ ...acc, [image.imageType]: [image.imageUrl] }),
    {}
  );

  const timestamp = event.timestamp;
  const date = format(new Date(timestamp), 'iii MMMM do');
  const timeDate = format(new Date(timestamp), 'h:mm a');
  const seatInfo = `Sec ${section}, Row ${row}, Seat ${highSeat}`;
  const ticketInfo = `1 Tickt(s) - ${seatInfo}`;
  return (
    <StyledDetailsBackground>
      <StyledDetailsHeader
        backgroundImage={`url(${
          !isMobileDevice
            ? eventImages['heroTickets']
            : eventImages['heroTicketsMobile']
        })`}
      />
      <TicketDetailsContainer>
        {loading ? (
          <Loader centered />
        ) : (
          <>
            <Flex width="100%" justify="space-between">
              <FlexItem flex="1" position="relative">
                <MainTitle>My Ticket</MainTitle>
              </FlexItem>
            </Flex>
            <Flex width="100%" justify="space-between">
              {!isMobileDevice && <FlexItem flex="1"></FlexItem>}
              <StyledOrderId>
                <Flex align="center">
                  <Title>Order ID: {orderId}</Title>
                  {false && <StyledLink>View Receipt →</StyledLink>}
                </Flex>
              </StyledOrderId>
            </Flex>
            <Content>
              <Flex width="100%">
                <SectionTitle>Event</SectionTitle>
                <SectionContainer width="100%" justify="space-between" row>
                  <FlexItem>
                    <MainInfo>{event.name}</MainInfo>
                    <AddressInfo>
                      {date} at {timeDate} <br />
                      {city} {state} · {venueName}
                    </AddressInfo>
                    <StyledLink href={directionsUrl} target="_blank">
                      Get Directions →
                    </StyledLink>
                  </FlexItem>
                  {!isMobileDevice && (
                    <FlexItem flex={0}>
                      <SectionImage
                        height="100px"
                        width="220px"
                        alignSelf="flex-end"
                        backgroundImage={`url(${
                          eventImages['thumbEvent'] || eventTicketMockImage
                        })`}
                      />
                    </FlexItem>
                  )}
                </SectionContainer>
              </Flex>
              <Flex width="100%">
                <SectionTitle>Seating</SectionTitle>
                <SectionContainer column minHeight="55px">
                  <MainInfo>{seatInfo}</MainInfo>
                  {false && (
                    <ImagesContainer>
                      <FlexItem>
                        <SectionImage
                          hasShadow
                          backgroundImage={`url(${seatMockImage})`}
                        />
                      </FlexItem>
                      <FlexItem>
                        <SectionImage
                          hasShadow
                          backgroundImage={`url(${eventImages['heroTickets']})`}
                        />
                      </FlexItem>
                    </ImagesContainer>
                  )}
                </SectionContainer>
              </Flex>
              <Flex width="100%">
                <SectionTitle>Tickets</SectionTitle>
                <SectionContainer column minHeight="155px">
                  <MainInfo>{ticketInfo}</MainInfo>
                  {ticketsUrl !== '' ? (
                    <Text>Have your ticket ready at the door.</Text>
                  ) : (
                    <Flex align="center" width="70%">
                      <Text>
                        Your tickets are being processed. We'll email you when
                        they're ready.
                        <StyledLink href="#">Learn more.</StyledLink>
                      </Text>
                    </Flex>
                  )}

                  {ticketsUrl !== '' && (
                    <Flex align="center">
                      <IconContainer>
                        <DownloadIcon />
                      </IconContainer>
                      <StyledLink href={ticketsUrl}>
                        Download your ticket
                      </StyledLink>
                    </Flex>
                  )}
                </SectionContainer>
              </Flex>
            </Content>
          </>
        )}
      </TicketDetailsContainer>
      <Footer />
    </StyledDetailsBackground>
  );
};

OrderDetails.propTypes = {
  location: PropTypes.object,
};
