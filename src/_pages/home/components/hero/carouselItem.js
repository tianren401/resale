import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCarouselItem = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20%;
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
  font-size: 24px;
  font-weight: bold;
`;

const EventLocation = styled.div`
  font-size: 16px;
  padding: 5px;
`;

const StyledButton = styled.button`
  background: #6726f1;
  opacity: 0.8;
  border-radius: 6px;
  color: white;
  width: 10%;
  margin: 5px;
  padding: 10px;
`;

export const CarouselItem = ({ backgroundImage, title, desc }) => (
  <StyledCarouselItem backgroundImage={backgroundImage}>
    <EventInfo>
      <Artist>{title}</Artist>
      <EventLocation>{desc}</EventLocation>
      <StyledButton>Buy Tickets</StyledButton>
    </EventInfo>
  </StyledCarouselItem>
);

CarouselItem.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  slidePrev: PropTypes.func.isRequired,
  slideNext: PropTypes.func.isRequired,
};
