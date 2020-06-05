import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import { useDispatch } from 'react-redux';

import { getPerformersInfoAction } from '_store/search';
import { colors } from '_constants';

import arrowImage from '_images/arrowImage.png';
import mockPerformerImage from '_images/mocks/broadwayEvent14.png';
import { deviceSize } from '_constants';
import { Flex } from '_components';

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

  color: ${colors.black};
  &:hover {
    color: ${colors.brand};
  }
`;

const SnapchatItem = styled(Flex)`
  width: 100%;
  height: 100px;
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
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    ${(props) => props.backgroundImage};
  background-blend-mode: multiply, normal, normal;
  border-radius: 8px;
`;

const CarouselTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: black;
  text-transform: capitalize;
  margin-left: 21px;
  margin-bottom: 6px;

  @media (max-width: ${deviceSize.tablet}px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const CarouselItemImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => props.backgroundImage};
  &:hover {
    background-size: cover;
    background-color: linear-gradient(
      180deg,
      rgba(252, 252, 252, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    background-blend-mode: multiply, normal;
    box-shadow: 0px 7px 30px rgba(0, 0, 0, 0.25),
      0px 0px 4px rgba(91, 93, 99, 0.16), 0px 0px 2px rgba(130, 136, 148, 0.08);
  }
`;

const CarouselItemTitle = styled.span`
  display: block;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  color: {colors.black};
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    color: ${colors.brand};
  }
`;

const SnapchatItemTitle = styled.div`
  display: block;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: #fff;

  & > span {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }
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

export const PerformerCarousel = ({
  title,
  itemsToShow,
  performers,
  performersMeta,
}) => {
  const itemCount = itemsToShow || 4;
  const blankElement = () => <></>;
  const carousel = useRef(null);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 2, itemPadding: [0, 30] },
    { width: 768, itemsToShow: 4 },
  ];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (performers?.length > itemCount) setShowNextBtn(true);
  }, [itemCount, performers]);

  useEffect(() => {
    if (performers?.length > 0) {
      const performerIds = performers.map((performer) => performer.objectID);
      dispatch(getPerformersInfoAction(performerIds));
    }
  }, [performers, dispatch]);

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

  return performers?.length > 0 ? (
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
        {performers.map((performer, index) => {
          return (
            <CarouselItem
              key={`performer-${performer.objectID}-${index}`}
              to={`performer/${performer.objectID}`}
            >
              <CarouselItemImage
                backgroundImage={`url(${
                  performersMeta[performer.objectID]?.images?.carouselSearch ||
                  mockPerformerImage
                })`}
              />
              <CarouselItemTitle>{performer.name}</CarouselItemTitle>
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

      <StyledSnapchat flexWrap="wrap">
        {performers &&
          performers.slice(0, 6).map((performer) => {
            return (
              <SnapchatItem
                key={performer.objectID}
                direction="column"
                justify="flex-end"
                backgroundImage={`url(${
                  performersMeta[performer.objectID]?.images?.carouselSearch ||
                  mockPerformerImage
                })`}
                onClick={() => {
                  history.push(`performer/${performer.objectID}`);
                }}
              >
                <SnapchatItemTitle>{performer.name}</SnapchatItemTitle>
              </SnapchatItem>
            );
          })}
      </StyledSnapchat>
    </Container>
  ) : null;
};

PerformerCarousel.propTypes = {
  title: PropTypes.string,
  itemsToShow: PropTypes.number,
  performers: PropTypes.array,
  performersMeta: PropTypes.object,
};
