import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const StyledCarouselItem = styled.div`
  width: 100%;
  padding: 0 20%;
  height: 70%;
  min-height: 800px;
  align-items: center;
  color: #fff;
  font-size: 4em;
  background-size: cover;
  background-position: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  position: relative;
  z-index: -2;
`;

const EventInfo = styled.div`
  width: 100%;
  position: absolute;
  top: calc(40% - 10px);
  z-index: 0;
`;

const Artist = styled.div`
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
`;

const EventLocation = styled.div`
  font-size: 18px;
  line-height: 24px;
  padding: 12px 0;
`;

const StyledButton = styled.button`
  background: #6726f1;
  opacity: 0.8;
  border-radius: 6px;
  color: white;
  width: 160px;
  padding: 13px 24px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  line-height: 20px;
  margin-top: 32px;
`;

export const CarouselItem = ({ backgroundImage, title, desc, time }) => {
  let date = format(new Date(time), 'MMMM do');
  let timeDate = format(new Date(time), 'h:mm a');

  return (
    <StyledCarouselItem backgroundImage={backgroundImage}>
      <EventInfo>
        <Artist>{title}</Artist>
        <EventLocation>
          {date} · {timeDate} · {desc}
        </EventLocation>
        <StyledButton>Buy Tickets</StyledButton>
      </EventInfo>
    </StyledCarouselItem>
  );
};

CarouselItem.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  time: PropTypes.string,
};
