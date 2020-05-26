import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FlexItem, EventCard, VenueCard } from '_components';
import {
  AutocompleteItem,
  SectionContainer,
  AvatarImage,
} from './styledComponents';

export const ListItem = ({ data, indexName, ...rest }) => {
  if (!data) {
    return null;
  }

  const { className, handleItemClick } = rest;
  let child = null;
  switch (indexName) {
    case 'events':
      child = (
        <Link to={`/event/${data.objectID}`}>
          <SectionContainer column>
            <EventCard
              event={data}
              key={data.id}
              timestamp={data.timestamp}
              name={data.name}
              venueName={data.venue}
              venueState={data.venue.state}
            />
          </SectionContainer>
        </Link>
      );
      break;
    case 'venues':
      child = (
        <Link to={`/venue/${data.objectID}`}>
          <SectionContainer>
            <VenueCard venue={data} key={data.id} />
          </SectionContainer>
        </Link>
      );
      break;
    case 'performers':
    default:
      child = (
        <Link to={`/performer/${data.objectID}`}>
          <SectionContainer align="center">
            <FlexItem flex={0}>
              <AvatarImage />
            </FlexItem>
            <FlexItem>
              <h2>{data.name}</h2>
            </FlexItem>
          </SectionContainer>
        </Link>
      );
      break;
  }

  return (
    <AutocompleteItem
      className={className}
      key={data.objectID}
      onClick={handleItemClick}
    >
      {child}
    </AutocompleteItem>
  );
};

ListItem.propTypes = {
  data: PropTypes.any,
  indexName: PropTypes.string.isRequired,
};
