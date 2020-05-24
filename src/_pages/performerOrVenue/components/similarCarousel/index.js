import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import arrowImage from '_images/arrowImage.png';
import { deviceSize } from '_constants';

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

const CarouselItem = styled(Link)`
  width: 100%;
  height: 172px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  max-width: 220px;
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
  color: white;
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

const SlideButton = styled.div`
  position: absolute;
  top: 40px;
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

export const SimilarCarousel = ({ itemsToShow, similar }) => {
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
    if (similar?.length > itemCount) setShowNextBtn(true);
  }, [itemCount, similar]);

  const scroll = (direction) => {
    if (!carousel.current) return;
    if (direction < 0) carousel.current.slidePrev();
    else carousel.current.slideNext();
  };

  const handleButtonVisible = (currentItem) => {
    if (currentItem.index === similar.length - itemCount) setShowNextBtn(false);
    else setShowNextBtn(true);
    if (currentItem.index === 0) setShowPrevBtn(false);
    else setShowPrevBtn(true);
  };

  return (
    <Container>
      {similar && (
        <StyledCarousel
          itemsToShow={itemCount}
          renderArrow={blankElement}
          renderPagination={blankElement}
          ref={carousel}
          onPrevEnd={handleButtonVisible}
          onNextEnd={handleButtonVisible}
          breakPoints={breakPoints}
          itemPadding={[0, 10]}
        >
          {similar &&
            similar.map((attraction) => {
              let imgUri = attraction.images[0].imageUrl || '';
              if (!imgUri.startsWith('http')) {
                imgUri = require(`../${imgUri}`);
              }
              let id;
              let route;
              if (attraction && attraction.venue) {
                id = attraction.venue.id;
                route = `../venue/${id}`;
              } else if (attraction && attraction.performer) {
                id = attraction.performer.id;
                route = `../performer/${id}`;
              }

              return (
                <CarouselItem key={id} to={route}>
                  <CarouselItemImage backgroundImage={`url(${imgUri})`} />
                  <CarouselItemTitle>
                    {attraction?.performer
                      ? attraction.performer.name
                      : attraction.venue.name}
                  </CarouselItemTitle>
                  <CarouselItemDesc></CarouselItemDesc>
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
    </Container>
  );
};

SimilarCarousel.propTypes = {
  title: PropTypes.string,
  itemsToShow: PropTypes.number,
  similar: PropTypes.array,
};