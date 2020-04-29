import React from 'react';
import styled from 'styled-components'
import Carousel, { consts } from 'react-elastic-carousel';

import { CarouselItem } from './heroCarouselItem';
import leftArrow from '../../../images/leftArrow.svg';
import rightArrow from '../../../images/rightArrow.svg';


const StyledHeroBackground = styled.div`
background-image: linear-gradient(45deg, #654ea3, #eaafc8);
transform: skewY(-11deg);
`;

const StyledCarouselCircleContainer = styled.div`
display: flex;
width: 10%;
justify-content: space-between;
`;

const StyledCarouselCircle = styled.div`
height: 10px;
width: 10px;
background-color: gray;
border-radius: 50%;
display: inline-block;
position: relative;
bottom: 150px;
&:active {
    background-color: white;
}
`;

const CarouselArrow = styled.div`
position: relative;
top: 215px;
`;


const renderCarouselArrows = ({ type, onClick }) => {
    const pointer = type === consts.PREV ? <img src={leftArrow} style={{"position":"relative", "left":"200px"}}/> : <img src={rightArrow} style={{"position":"relative", "right":"500px"}}/>
    return <CarouselArrow onClick={onClick}>{pointer}</CarouselArrow>
  }

export const HeroCarousel = ({ events }) => {
    return ( 
    // <StyledHeroBackground>
        <Carousel
        renderPagination={({ pages, activePage, onClick }) => {
            return (
              <StyledCarouselCircleContainer>
                {pages.map(page => {
                  const isActivePage = activePage === page
                  return (
                    <StyledCarouselCircle
                      key={page}
                      onClick={() => onClick(page)}
                      active={isActivePage}
                    />
                  )
                })}
              </StyledCarouselCircleContainer>
            )
          }}
            renderArrow={renderCarouselArrows}>


{events.map((item) => {
          let imgUrl = item.src || '';
          if (!imgUrl.startsWith('http')) {
            imgUrl = require(`../${imgUrl}`);
          }
       return (
            <CarouselItem key={item.id} title={item.name} desc={item.venue.name} imgUrl={imgUrl}/>
          );
        })}
        </Carousel>
    // </StyledHeroBackground>
    )
}