import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  AutocompleteItem,
  AutocompleteList,
  EmptyListContainer,
} from './StyledComponents';

const LocationsDropdown = React.forwardRef((props, ref) => {
  const { activeOption, handleItemClick, results } = props;
  // map data
  const options = _.chain(results).get('hits.hits', []).slice(0, 10).value();

  let optionList = null;

  if (options.length) {
    optionList = (
      <AutocompleteList ref={ref}>
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
      <AutocompleteList ref={ref}>
        <AutocompleteItem>
          <EmptyListContainer>
            <em>No Results...</em>
          </EmptyListContainer>
        </AutocompleteItem>
      </AutocompleteList>
    );
  }

  return optionList;
});

LocationsDropdown.displayName = 'LocationsDropdown';

export default LocationsDropdown;
