import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import { CarouselItem } from './carouselItem';
import leftArrow from '_images/leftArrow.svg';
import rightArrow from '_images/rightArrow.svg';

const StyledCarouselIndicatorContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 30%;
`;

const StyledCarouselIndicator = styled.div`
  height: 8px;
  width: 8px;
  background-color: ${({ active }) =>
    active ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.24)'};
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  cursor: pointer;

  &:active {
    background-color: white;
  }
`;

const LeftArrow = styled.img`
  position: absolute;
  top: 40%;
  left: 15%;
  cursor: pointer;
`;

const RightArrow = styled.img`
  position: absolute;
  top: 40%;
  right: 20%;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  position: relative;
`;

export const Hero = ({ events }) => {
  const carouselRef = useRef(null);
  const [leftEnd, setLeftEnd] = useState(true);
  const [rightEnd, setRightEnd] = useState(false);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    if (direction < 0 && !leftEnd) carouselRef.current.slidePrev();
    else if (direction < 0 && leftEnd) carouselRef.current.goTo(events.length - 1);
    else if (direction > 0 && rightEnd) carouselRef.current.goTo(0);
    else if (direction > 0 && !rightEnd) carouselRef.current.slideNext();
  };

  const handleButtonVisible = (currentItem) => {
    if (currentItem.index === events.length - 1) setRightEnd(true);
    else setRightEnd(false);
    if (currentItem.index === 0) setLeftEnd(true);
    else setLeftEnd(false);
  };

  return (
    <Container>
      <Carousel
        ref={carouselRef}
        onPrevEnd={handleButtonVisible}
        onNextEnd={handleButtonVisible}
        renderPagination={({ pages, activePage, onClick }) => {
          return (
            <StyledCarouselIndicatorContainer>
              {pages.map((page) => {
                const isActivePage = activePage === page;
                return (
                  <StyledCarouselIndicator
                    key={page}
                    onClick={() => onClick(page)}
                    active={isActivePage}
                  />
                );
              })}
            </StyledCarouselIndicatorContainer>
          );
        }}
        renderArrow={() => <></>}
        style={{ margin: 0 }}
      >
        {events.map((event) => {
          let imgUri = event.venue.image || '';
          if (!imgUri.startsWith('http')) {
            imgUri = require(`../../../${imgUri}`);
          }
          return (
            <CarouselItem
              key={event.id}
              title={event.name}
              desc={event.venue.name}
              backgroundImage={imgUri}
              time={event.timestamp}
            />
          );
        })}
      </Carousel>
      <LeftArrow src={leftArrow} onClick={() => scroll(-1)} />
      <RightArrow src={rightArrow} onClick={() => scroll(1)} />
    </Container>
  );
};

Hero.propTypes = {
  events: PropTypes.array,
};
