import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  AutocompleteItem,
  AutocompleteList,
  EmptyListContainer,
} from './StyledComponents';

const LocationsDropdown = ({ results, ...rest }) => {
  // map data
  const options = _.chain(results).get('hits.hits', []).slice(0, 10).value();
  const { activeOption, handleItemClick } = rest;
  let optionList = null;

  if (options.length) {
    optionList = (
      <AutocompleteList>
        {options.map((hit, index) => {
          let className;
          if (index === activeOption) {
            className = 'active';
          }

          const venueName = `${hit._source.name}, ${hit._source.street}, ${hit._source.city}, ${hit._source.state}`;

          return (
            <AutocompleteItem
              className={className}
              key={hit._id}
              onClick={handleItemClick}
            >
              {venueName}
            </AutocompleteItem>
          );
        })}
      </AutocompleteList>
    );
  } else {
    optionList = (
      <EmptyListContainer>
        <em>No Results...</em>
      </EmptyListContainer>
    );
  }

  return optionList;
};

export default LocationsDropdown;
