import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

import { deviceSize } from '_constants';

export const Container = styled.div`
  display: block;
  width: 100%;
  position: relative;
  margin: auto;
`;

export const StyledCarousel = styled(Carousel)`
  padding: 0;
  margin: 0;

  @media (min-width: ${deviceSize.tablet}px) {
    display: block;
  }
`;

export const CarouselItem = styled(Link)`
  width: 100%;
  height: 172px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  max-width: 220px;
`;

export const CarouselItemImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => props.backgroundImage};
`;

export const CarouselItemTitle = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  color: white;
  margin-top: 12px;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: ${deviceSize.tablet}px) {
    color: black;
  }
`;

export const CarouselItemDesc = styled.span`
  display: block;
  font-size: 12px;
  line-height: 20px;
  color: #888;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const SlideButton = styled.div`
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

export const ButtonImage = styled.img`
  left: 16px;
  position: absolute;
  top: 12px;
`;
