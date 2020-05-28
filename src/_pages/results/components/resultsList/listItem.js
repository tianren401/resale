import React from 'react';
import PropTypes from 'prop-types';

import { EventCard, VenueCard } from '_components';
import { AutocompleteItem, SectionContainer } from './styledComponents';

export const ListItem = ({ data, indexName, ...rest }) => {
  if (!data) {
    return null;
  }

  const { className, handleItemClick } = rest;
  let child = null;
  switch (indexName) {
    case 'events':
      child = (
        <SectionContainer column>
          <EventCard
            event={{ ...data, id: data.objectID }}
            timestamp={data.timestamp}
            name={data.name}
            venueName={data.venue}
            venueState={data.venue.state}
          />
        </SectionContainer>
      );
      break;
    case 'venues':
    default:
      child = (
        <SectionContainer>
          <VenueCard venue={{ ...data, id: data.objectID }} />
        </SectionContainer>
      );
      break;
  }

  return (
    <AutocompleteItem className={className} onClick={handleItemClick}>
      {child}
    </AutocompleteItem>
  );
};

ListItem.propTypes = {
  data: PropTypes.any,
  indexName: PropTypes.string.isRequired,
};
