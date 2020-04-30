import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import { format } from 'date-fns';

import arrowImage from 'assets/images/arrowImage.png';

const Container = styled.div`
  display: block;
  width: 100%;
  position: relative;
  margin: auto;
`;

const StyledCarousel = styled(Carousel)`
  padding: 0;
  margin: 0;
`;

const CarouselItem = styled.div`
  width: calc(100% - 20px);
  height: 172px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  max-width: 220px;
`;

const CarouselTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-left: 21px;
  margin-bottom: 6px;
`;

const CarouselItemImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CarouselItemTitle = styled.span`
  display: block;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  color: #222;
  margin-top: 12px;
  white-space: nowrap;
  overflow: hidden;
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

const CarouselItemPrice = styled.span`
  position: absolute;
  top: 8px;
  right: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  color: white;
  padding: 0 5px;
  background: rgba(13, 13, 13, 0.8);
  border-radius: 6px;
`;

const SlideButton = styled.div`
  position: absolute;
  top: 71px;
  bottom: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 7px 40px rgba(0, 0, 0, 0.15), 0px 0px 4px rgba(130, 136, 148, 0.16),
    0px 0px 2px rgba(130, 136, 148, 0.08);
  cursor: pointer;

  &.prev {
    left: -7px;
    transform: rotate(-180deg);
  }
  &.next {
    right: -7px;
  }
`;

const ButtonImage = styled.img`
  left: 16px;
  position: absolute;
  top: 12px;
`;

export const EventCarousel = ({ title, itemsToShow, events }) => {
  const itemCount = itemsToShow || 4;
  const blankElement = () => <></>;
  const carousel = useRef(null);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 2, itemPadding: [0, 30] },
    { width: 768, itemsToShow: 4 },
  ];

  useEffect(() => {
    if (events.length > itemCount) setShowNextBtn(true);
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
      <StyledCarousel
        itemsToShow={itemCount}
        renderArrow={blankElement}
        renderPagination={blankElement}
        ref={carousel}
        onPrevEnd={handleButtonVisible}
        onNextEnd={handleButtonVisible}
        breakPoints={breakPoints}
      >
        {events.map((item) => {
          let imgUri = item.venue.image || '';
          if (!imgUri.startsWith('http')) {
            imgUri = require(`../${imgUri}`);
          }
          let date = format(new Date(item.timestamp), 'MMM d');

          return (
            <CarouselItem key={item.id}>
              <CarouselItemImage style={{ backgroundImage: `url(${imgUri})` }} />
              <CarouselItemTitle>{item.name}</CarouselItemTitle>
              <CarouselItemDesc>
                {date} · {item.venue.name}
              </CarouselItemDesc>
              <CarouselItemPrice>${item.price}</CarouselItemPrice>
            </CarouselItem>
          );
        })}
      </StyledCarousel>
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
    </Container>
  );
};

EventCarousel.propTypes = {
  title: PropTypes.string,
  itemsToShow: PropTypes.number,
  events: PropTypes.array,
};
