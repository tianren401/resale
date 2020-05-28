import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledHeader,
  EventInfo,
  AttractionName,
  Subtitle,
  Address,
} from './styledComponents';

export const PerformerVenueHeader = ({
  attractions,
  image,
  name,
  subtitle,
  type,
}) => {
  return (
    <StyledHeader image={image}>
      <EventInfo>
        <AttractionName>{attractions ? name : 'No results'}</AttractionName>
        {type === 'venue' && (
          <Address>
            {attractions.allUpcomingEvents?.length &&
              `${attractions.allUpcomingEvents[0][type].street} ${attractions.allUpcomingEvents[0][type].city} ${attractions.allUpcomingEvents[0][type].state} ${attractions.allUpcomingEvents[0][type].zip}`}
          </Address>
        )}
        <Subtitle>{subtitle}</Subtitle>
      </EventInfo>
    </StyledHeader>
  );
};

PerformerVenueHeader.propTypes = {
  attractions: PropTypes.object,
  image: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  type: PropTypes.string,
};
