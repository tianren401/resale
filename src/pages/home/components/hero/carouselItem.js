import React from 'react';
import styled from 'styled-components';

import leftArrow from 'images/leftArrow.svg'
import rightArrow from 'images/rightArrow.svg'

const StyledCarouselItem = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
  align-items: center;
  color: #fff;
  font-size: 4em;
  background-size: cover;
  background-image: url(${({ backgroundImage }) => backgroundImage});
`;

const EventInfo = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const Artist = styled.div`
padding: 5px;
`;

const EventLocation = styled.div`
font-size: 16px;
padding: 5px;
`;

const StyledButton = styled.button`
background: #6726F1;
opacity: 0.8;
border-radius: 6px;
color: white;
width: 10%;
margin: 5px;
padding: 10px;
`;

const ArrowGroup = styled.div`
display: flex;
width: 60%;
margin: 0 auto;
`;

const Arrow = styled.img`

`;

export const CarouselItem = (props) => (
  <StyledCarouselItem backgroundImage={props.backgroundImage}>

    <ArrowGroup>
      <Arrow src={leftArrow} onClick={props.slidePrev} />
      <EventInfo>
        <Artist>{props.title}</Artist>
        <EventLocation>{props.desc}</EventLocation>
        <StyledButton>Buy Tickets</StyledButton>
      </EventInfo>
      <Arrow src={rightArrow} onClick={props.slideNext} />
    </ArrowGroup>
  </StyledCarouselItem>
)