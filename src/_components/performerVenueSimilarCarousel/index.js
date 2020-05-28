import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import arrowImage from '_images/arrowImage.png';
import {
  Container,
  StyledCarousel,
  CarouselItem,
  CarouselItemImage,
  CarouselItemTitle,
  CarouselItemDesc,
  SlideButton,
  ButtonImage,
} from './styledComponents';

export const PerformerVenueSimilarCarousel = ({
  itemsToShow,
  similar,
  type,
}) => {
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
              const imgUri = attraction.images[0].imageUrl;
              const id = attraction[type].id;
              const route = `../${type}/${id}`;

              return (
                <CarouselItem key={id} to={route}>
                  <CarouselItemImage backgroundImage={`url(${imgUri})`} />
                  <CarouselItemTitle>{attraction[type].name}</CarouselItemTitle>
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

PerformerVenueSimilarCarousel.propTypes = {
  title: PropTypes.string,
  itemsToShow: PropTypes.number,
  similar: PropTypes.array,
  type: PropTypes.string,
};
