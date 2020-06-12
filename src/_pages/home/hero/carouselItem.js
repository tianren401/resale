import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import {
  StyledCarouselItem,
  Artist,
  EventInfo,
  EventLocation,
  StyledButton,
  BuyTicketBtn,
  EventBackground,
} from './styledComponents';

export const CarouselItem = ({ backgroundImage, title, desc, time, id }) => {
  const date = format(new Date(time), 'MMMM do');
  const timeDate = format(new Date(time), 'h:mm a');

  return (
    <StyledCarouselItem>
      <EventBackground backgroundImage={backgroundImage} />
      <EventInfo>
        <Artist>{title}</Artist>
        <EventLocation>
          {date} · {timeDate} · {desc}
        </EventLocation>
        <Link to={`event/${id}`}>
          <StyledButton
            fontSize="14px"
            fontWeight="500"
            textAlign="center"
            minWidth="160px"
          >
            Get Tickets
          </StyledButton>
          <BuyTicketBtn>Get Tickets →</BuyTicketBtn>
        </Link>
      </EventInfo>
    </StyledCarouselItem>
  );
};

CarouselItem.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.number,
};
