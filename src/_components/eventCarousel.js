import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import { format } from 'date-fns';

import arrowImage from '_images/arrowImage.png';
import { deviceSize } from '_constants';
import { Flex } from '_components/flex';
import { isMobileDevice } from '_helpers';

const Container = styled.div`
  display: block;
  width: 100%;
  position: relative;
  margin: auto;
`;

const StyledCarousel = styled(Carousel)`
  padding: 0;
  margin: 0;
  display: none;

  @media (min-width: ${deviceSize.tablet}px) {
    display: block;
  }
`;

const StyledSnapchat = styled(Flex)`
  display: flex;
  padding: 7px;
  @media (min-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const CarouselItem = styled(Link)`
  width: 100%;
  height: 172px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  max-width: 220px;
`;

const SnapchatItem = styled(Flex)`
  width: 100%;
  height: 214px;
  cursor: pointer;
  margin: 8px;
  padding: 8px;
  position: relative;
  max-width: 164px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      180deg,
      rgba(55, 55, 55, 0.08) 0%,
      rgba(0, 0, 0, 0.62) 100%
    ),
    ${(props) => props.backgroundImage};
`;

const CarouselTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin-left: 10px;
  margin-bottom: 6px;
`;

const CarouselItemImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => props.backgroundImage};
`;

const CarouselItemTitle = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  color: #222;
  margin-top: 12px;
  white-space: nowrap;
  overflow: hidden;
`;

const SnapchatItemTitle = styled.div`
  display: block;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #fff;

  & > div {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }
`;

const SnapchatItemDate = styled.div`
  font-size: 12px;
  line-height: 24px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
`;

const CarouselItemDesc = styled.span`
  display: block;
  font-size: 12px;
  line-height: 20px;
  color: #888;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

// Saving for when we get prices

// const CarouselItemPrice = styled.span`
//   position: absolute;
//   top: 8px;
//   right: 6px;
//   font-weight: 500;
//   font-size: 12px;
//   line-height: 24px;
//   color: white;
//   padding: 0 5px;
//   background: rgba(13, 13, 13, 0.8);
//   border-radius: 6px;
// `;

const SlideButton = styled.div`
  position: absolute;
  top: 71px;
  bottom: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 7px 40px rgba(0, 0, 0, 0.15),
    0px 0px 4px rgba(130, 136, 148, 0.16), 0px 0px 2px rgba(130, 136, 148, 0.08);
  cursor: pointer;

  &.prev {
    left: -7px;
    transform: rotate(-180deg);
  }
  &.next {
    right: -7px;
  }

  display: none;

  @media (min-width: ${deviceSize.tablet}px) {
    display: block;
  }
`;

const ButtonImage = styled.img`
  left: 16px;
  position: absolute;
  top: 12px;
`;

export const EventCarousel = ({ title, itemsToShow, events }) => {
  const itemCount = itemsToShow;
  const blankElement = () => <></>;
  const carousel = useRef(null);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 2, itemPadding: [0, 30] },
    { width: 768, itemsToShow: 4 },
  ];

  useEffect(() => {
    if (events?.length > itemCount) setShowNextBtn(true);
  }, [itemCount, events]);

  const scroll = (direction) => {
    if (!carousel.current) return;
    if (direction < 0) carousel.current.slidePrev();
    else carousel.current.slideNext();
  };

  const handleButtonVisible = (currentItem) => {
    if (currentItem.index === events.length - itemCount) setShowNextBtn(false);
    else setShowNextBtn(true);
    if (currentItem.index === 0) setShowPrevBtn(false);
    else setShowPrevBtn(true);
  };

  return (
    <Container>
      {title && <CarouselTitle>{title}</CarouselTitle>}
      {events && (
        <StyledCarousel
          itemsToShow={itemCount}
          itemsToScroll={4}
          renderArrow={blankElement}
          renderPagination={blankElement}
          ref={carousel}
          onPrevEnd={handleButtonVisible}
          onNextEnd={handleButtonVisible}
          breakPoints={breakPoints}
          itemPadding={[0, 10]}
        >
          {events &&
            events.map((event) => {
              const desktopImage =
                event?.images?.length &&
                event.images.find((image) => image.imageType === 'carouselHome')
                  .imageUrl;
              const mobileImage =
                event?.images?.length &&
                event.images.find(
                  (image) => image.imageType === 'carouselHomeMobile'
                ).imageUrl;

              const date = format(new Date(event.event.timestamp), 'MMM d');
              return (
                <CarouselItem
                  key={event.event.id}
                  to={`event/${event.event.id}`}
                >
                  <CarouselItemImage
                    backgroundImage={`url(${
                      isMobileDevice ? mobileImage : desktopImage
                    })`}
                  />
                  <CarouselItemTitle>{event.event.name}</CarouselItemTitle>
                  <CarouselItemDesc>
                    {date} · {event.event.venue.name}
                  </CarouselItemDesc>
                  {/* // Saving for when we get prices */}
                  {/* <CarouselItemPrice>${event.event.price}</CarouselItemPrice> */}
                </CarouselItem>
              );
            })}
        </StyledCarousel>
      )}
      {showPrevBtn ? (
        <SlideButton className="prev" onClick={() => scroll(-1)}>
          <ButtonImage src={arrowImage} alt="Next" />
        </SlideButton>
      ) : (
        <></>
      )}
      {showNextBtn ? (
        <SlideButton className="next" onClick={() => scroll(1)}>
          <ButtonImage src={arrowImage} alt="Next" />
        </SlideButton>
      ) : (
        <></>
      )}
      <StyledSnapchat flexWrap="wrap">
        {events &&
          events.map((event) => {
            const desktopImage =
              event?.images?.length &&
              event.images.find((image) => image.imageType === 'carouselHome')
                .imageUrl;
            const mobileImage =
              event?.images?.length &&
              event.images.find(
                (image) => image.imageType === 'carouselHomeMobile'
              ).imageUrl;
            const date = format(new Date(event.event.timestamp), 'MMM d');

            return (
              <SnapchatItem
                key={event.event.id}
                direction="column"
                justify="space-between"
                backgroundImage={`url(${
                  isMobileDevice ? mobileImage : desktopImage
                })`}
              >
                <SnapchatItemDate>
                  {date}
                  {/* // Saving for when we get prices */}
                  {/* <CarouselItemPrice>${event.event.price}</CarouselItemPrice> */}
                </SnapchatItemDate>
                <SnapchatItemTitle>
                  {event.event.name}
                  <div>{event.event.venue.name}</div>
                </SnapchatItemTitle>
              </SnapchatItem>
            );
          })}
      </StyledSnapchat>
    </Container>
  );
};

EventCarousel.propTypes = {
  title: PropTypes.string,
  itemsToShow: PropTypes.number,
  events: PropTypes.array,
};
