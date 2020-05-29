import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ajaxGet } from '../../_helpers/api';
import { getTicketGroupListAction } from '_store/ticketGroupList';
import { setCheckoutTicketEventDataAction } from '_store/checkoutTicket';
import { EventLayout } from '_components';
import { Header } from './components/header';
import { TicketGroupList } from './components/ticketGroupList';
import { PreCheckout } from './components/preCheckout';
import { FilterOptions } from './components/filterOptions';
import { navigationHeight } from '../../_constants';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: calc(100vh - ${navigationHeight}px);
`;

const TicketsContainer = styled.div`
  position: relative;
  width: 320px;
  height: 100%;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.15);
  overflow: auto;

  ${({ checkout }) =>
    checkout &&
    `
    overflow: hidden;
    `};
`;

const MapFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 320px);
  height: 93%;
`;

const MapContainer = styled.div`
  margin: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 10px);
  z-index: 0;
`;

export const SeatSelection = ({ eventId }) => {
  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const checkoutTicket = useSelector((state) => state.checkoutTicketReducer);
  const dispatch = useDispatch();

  const ticketListRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const [eventData, setEventData] = React.useState(null);
  const [mapData, setMapData] = React.useState(null);
  const [filterOptions, setFilterOptions] = React.useState(null);

  useEffect(() => {
    dispatch(getTicketGroupListAction(eventId));
    const getData = async () => {
      const seaticsData = await ajaxGet(`maps/${eventId}`, 'jsonp');
      setEventData(await seaticsData[0]);
      setMapData(await seaticsData[1]);
    };
    getData();
  }, [dispatch, eventId]);

  useEffect(() => {
    const ticketGroups = ticketData.ticketGroupListFormatted;

    if (mapData && eventData && mapContainerRef?.current && ticketGroups) {
      dispatch(
        setCheckoutTicketEventDataAction({
          eventData: {
            ...eventData,
            eventDate: eventData.eventDate.toString(),
          },
          eventId,
        })
      );

      window.Seatics.config.enableLegend = false;
      window.Seatics.MapComponent.create({
        imgSrc: eventData.mapImage,
        tickets: ticketGroups,
        mapData: mapData,
        vfsUrl: 'https://vfs.seatics.com',
        container: window.jQuery(mapContainerRef.current),
        presentationInterface: {
          updateTicketsList: (ticketDataSegmented) => {
            ticketListRef.current.updateTicketDataSegmented(
              ticketDataSegmented
            );
          },
        },
        mapWidth: 1,
        mapHeight: 1,
        mapName: eventData.mapName,
        enableSectionInfoPopups: true,
      });

      setFilterOptions(window.Seatics.MapComponent.getFilterOptions());
    }
  }, [
    mapData,
    ticketData.ticketGroups,
    eventData,
    setFilterOptions,
    ticketData.ticketGroupListFormatted,
    dispatch,
    eventId,
  ]);

  return (
    <EventLayout>
      <Container>
        <Header event={eventData} />
        <TicketsContainer checkout={checkoutTicket.ticketGroupId}>
          <TicketGroupList ref={ticketListRef} />
          {checkoutTicket.ticketGroupId && <PreCheckout />}
        </TicketsContainer>
        <MapFilterContainer>
          <FilterOptions
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
          <MapContainer ref={mapContainerRef} />
        </MapFilterContainer>
      </Container>
    </EventLayout>
  );
};

SeatSelection.propTypes = {
  eventId: PropTypes.number,
};
