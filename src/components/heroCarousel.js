import React, { useRef } from 'react';
import styled from 'styled-components'
import Carousel, { consts } from 'react-elastic-carousel';

import { CarouselItem, StyledArrow } from './carouselItem';
import leftArrow from '../images/leftArrow.svg';
import rightArrow from '../images/rightArrow.svg';


const StyledHeroBackground = styled.div`
background-image: linear-gradient(45deg, #654ea3, #eaafc8);
transform: skewY(-11deg);
`;

const StyledCarouselCircleContainer = styled.div`
display: flex;
width: 5%;
justify-content: space-between;
`;

const StyledCarouselCircle = styled.div`
height: 10px;
width: 10px;
background-color: white;
border-radius: 50%;
display: inline-block;
position: relative;
bottom: 150px;
`;

const CarouselArrow = styled.div`
position: relative;
top: 215px;
`;

// const StyledCarousel = styled(Carousel)`
// "width": "100%";
// "transform": "skewY(-11deg)"
// `;

const renderCarouselArrows = ({ type, onClick }) => {
    const pointer = type === consts.PREV ? <img src={leftArrow} /> : <img src={rightArrow} />
    return <CarouselArrow onClick={onClick}>{pointer}</CarouselArrow>
  }

export const HeroCarousel = () => {
    let carouselRef = useRef();
    return ( 
    <StyledHeroBackground>
        <Carousel style={{"transform":"skewY(11deg)", "padding":".09719"}}
        renderPagination={() => {
            return (
                <StyledCarouselCircleContainer>
                    <StyledCarouselCircle />
                    <StyledCarouselCircle />
                    <StyledCarouselCircle />
                    <StyledCarouselCircle />
                </StyledCarouselCircleContainer>
            )
        }}
            renderArrow={renderCarouselArrows}>
            <CarouselItem />
            <CarouselItem />
        </Carousel>
    </StyledHeroBackground>
    )
}