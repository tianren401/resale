import React from 'react';
import styled from "styled-components";

import leftArrow from '../images/leftArrow.svg';
import rightArrow from '../images/rightArrow.svg';

const StyledCarouselItem = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
  align-items: center;
  color: #fff;
  font-size: 4em;
  background-size: cover;
  background-image: url("https://blog.ticketmaster.com/wp-content/uploads/BillieEilish-2020-1024x564.jpg");
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

export const Arrow = styled.img`
margin-bottom: 75px;
`;

export const CarouselItem = (props) => (
  <StyledCarouselItem>
    <ArrowGroup>

      <EventInfo>
        <Artist>Billie Eilish</Artist>
        <EventLocation>September 6th Georgia Dome</EventLocation>
        <StyledButton>Buy Tickets</StyledButton>
      </EventInfo>

    </ArrowGroup>
  </StyledCarouselItem>
)