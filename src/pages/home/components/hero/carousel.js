import React, { useRef } from 'react';
import styled from 'styled-components'
import ReactElasticCarousel from 'react-elastic-carousel';

import { CarouselItem } from './carouselItem';

const StyledCarouselIndicatorContainer = styled.div`
display: flex;
width: 10%;
justify-content: space-between;
`;

const StyledCarouselIndicator = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${({ active }) => active ? "white" : "gray"};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  bottom: 150px;

  &:active {
    background-color: white;
  }
`;

export const Carousel = ({ events }) => {
  let carouselRef = useRef();
  return (
    <ReactElasticCarousel ref={ref => (carouselRef = ref)}
      renderPagination={({ pages, activePage, onClick }) => {
        return (
          <StyledCarouselIndicatorContainer>
            {pages.map(page => {
              const isActivePage = activePage === page
              return (
                <StyledCarouselIndicator
                  key={page}
                  onClick={() => onClick(page)}
                  active={isActivePage}
                />
              )
            })}
          </StyledCarouselIndicatorContainer>
        )
      }}
      renderArrow={() => <></>}
    >

      {events.map((event) => {
        return (
          <CarouselItem key={event.id}
          title={event.name}
          desc={event.venue.name}
          backgroundImage={event.imageSource}
          slidePrev={() => carouselRef.slidePrev()}
          slideNext={() => carouselRef.slideNext()} 
          />
        );
      })}
    </ReactElasticCarousel>
  )
}
