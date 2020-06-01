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
            {attractions?.venue &&
              `${attractions.venue.street} ${attractions.venue.city} ${attractions.venue.state} ${attractions.venue.zip}`}
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
