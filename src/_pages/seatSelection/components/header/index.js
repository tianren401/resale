import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  StyledHeader,
  BackArrow,
  EventTitle,
  EventSubtitle,
} from './styledComponents';
import { isMobileDevice } from '_helpers';
import whiteLeftArrow from '_images/whiteLeftArrow.svg';

export const Header = ({ event }) => {
  const history = useHistory();

  return (
    <StyledHeader>
      {isMobileDevice && (
        <BackArrow
          src={whiteLeftArrow}
          onClick={history.goBack}
          alt={'back arrow'}
        />
      )}
      <EventTitle>{event?.eventName}</EventTitle>
      <EventSubtitle>
        {event?.eventDate.toDateString()} • {event?.city},{' '}
        {event?.stateProvince} • {event?.venueName}
      </EventSubtitle>
    </StyledHeader>
  );
};

Header.propTypes = {
  event: PropTypes.objectOf(Object),
};
