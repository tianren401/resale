import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import arrowImage from '_images/arrowImage.png';
import mockPerformerImage from '_images/mocks/broadwayEvent14.png';
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
`;

const CarouselItem = styled(Link)`
  width: 100%;
  height: 172px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  max-width: 220px;
`;

const CarouselTitle = styled.div`
  font-weight: 500;
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

export const PerformerCarousel = ({ title, itemsToShow, performers }) => {
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
    if (performers?.length > itemCount) setShowNextBtn(true);
  }, [itemCount, performers]);

  const scroll = (direction) => {
    if (!carousel.current) return;
    if (direction < 0) carousel.current.slidePrev();
    else carousel.current.slideNext();
  };

  const handleButtonVisible = (currentItem) => {
    if (currentItem.index === performers.length - itemCount)
      setShowNextBtn(false);
    else setShowNextBtn(true);
    if (currentItem.index === 0) setShowPrevBtn(false);
    else setShowPrevBtn(true);
  };

  return performers ? (
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
        itemPadding={[0, 10]}
      >
        {performers.map((item) => {
          return (
            <CarouselItem key={item.id} to={`event/${item.id}`}>
              <CarouselItemImage
                backgroundImage={`url(${mockPerformerImage})`}
              />
              <CarouselItemTitle>{item.name}</CarouselItemTitle>
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
  ) : null;
};

PerformerCarousel.propTypes = {
  title: PropTypes.string,
  itemsToShow: PropTypes.number,
  performers: PropTypes.array,
};
