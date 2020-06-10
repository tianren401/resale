import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import { CarouselItem } from './carouselItem';
import {
  Container,
  StyledCarouselIndicatorContainer,
  StyledCarouselIndicator,
  LeftArrow,
  RightArrow,
} from './styledComponents';
import leftArrow from '_images/leftArrow.svg';
import rightArrow from '_images/rightArrow.svg';
import { SearchRowContainer, SearchBar } from '_components';
import { isMobileDevice } from '_helpers';

export const Hero = ({ events }) => {
  const [timer, setTimer] = useState(null);
  const carouselRef = useRef(null);
  const currentIndex = useRef(0);

  const scroll = (step) => {
    if (!carouselRef.current || !events) return;
    const length = events.length;
    const newIndex = (currentIndex.current + step + length) % length;
    carouselRef.current.goTo(newIndex);
    currentIndex.current = newIndex;
  };

  const startAutoSlider = () => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(setInterval(() => scroll(1), 7000));
  };

  const moveNext = () => {
    scroll(1);
    startAutoSlider();
  };

  const prevNext = () => {
    scroll(-1);
    startAutoSlider();
  };

  useEffect(() => {
    if (timer) return;
    if (events)
      setTimer(
        setInterval(() => {
          if (!carouselRef.current || !events) return;
          const length = events.length;
          const newIndex = (currentIndex.current + 1 + length) % length;
          carouselRef.current.goTo(newIndex);
          currentIndex.current = newIndex;
        }, 7000)
      );
    return () => clearInterval(timer);
  }, [events, timer]);

  if (!events) return null;
  return (
    <Container>
      <Carousel
        ref={carouselRef}
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
        {events.map(({ event, images }) => {
          const desktopImage =
            images?.length &&
            images.find((image) => image.imageType === 'heroHome').imageUrl;
          const mobileImage =
            images?.length &&
            images.find((image) => image.imageType === 'heroHomeMobile')
              .imageUrl;
          return (
            <CarouselItem
              key={event.id}
              title={event.name}
              desc={event.venue?.name}
              backgroundImage={isMobileDevice ? mobileImage : desktopImage}
              time={event.timestamp}
              id={event.id}
            />
          );
        })}
      </Carousel>

      <LeftArrow src={leftArrow} onClick={prevNext} />
      <RightArrow src={rightArrow} onClick={moveNext} />
      <SearchRowContainer absolute>
        <SearchBar placeholder="Search by..." />
      </SearchRowContainer>
    </Container>
  );
};

Hero.propTypes = {
  events: PropTypes.array,
};
