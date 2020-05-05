import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactElasticCarousel from 'react-elastic-carousel';

import { CarouselItem } from './carouselItem';
import leftArrow from '_images/leftArrow.svg';
import rightArrow from '_images/rightArrow.svg';

const StyledCarouselIndicatorContainer = styled.div`
  display: flex;
  width: 10%;
  justify-content: space-between;
`;

const StyledCarouselIndicator = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${({ active }) => (active ? 'white' : 'gray')};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  bottom: 150px;

  &:active {
    background-color: white;
  }
`;

const LeftArrow = styled.img`
  position: absolute;
  top: 20%;
  left: 15%;
`;

const RightArrow = styled.img`
  position: absolute;
  top: 20%;
  right: 20%;
`;

const CarouselArrowGroup = styled.div`
  display: flex;
  top: 100px;
`;

export const Carousel = ({ events }) => {
  let carouselRef = useRef();
  return (
    <CarouselArrowGroup>
      <ReactElasticCarousel
        ref={(ref) => (carouselRef = ref)}
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
      >
        {events.map((event) => {
          return (
            <CarouselItem
              key={event.id}
              title={event.name}
              desc={event.venue.name}
              backgroundImage={event.imageSource}
              slidePrev={() => carouselRef.slidePrev()}
              slideNext={() => carouselRef.slideNext()}
            />
          );
        })}
      </ReactElasticCarousel>
      <LeftArrow src={leftArrow} onClick={() => carouselRef.slidePrev()} />
      <RightArrow src={rightArrow} onClick={() => carouselRef.slideNext()} />
    </CarouselArrowGroup>
  );
};

Carousel.propTypes = {
  events: PropTypes.array.isRequired,
};
