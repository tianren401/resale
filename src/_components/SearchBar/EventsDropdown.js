import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  AutocompleteItem,
  AutocompleteList,
  EmptyListContainer,
} from './StyledComponents';

const EventsDropdown = ({ results, ...rest }) => {
  // map data
  const options = _.chain(results)
    .get('hits.hits', [])
    .slice(0, 10)
    .groupBy('_index')
    .value();

  const topResult = _.head(options);

  let optionList = null;
  const { activeOption, dropdownEl, handleItemClick } = rest;
  const categories = Object.keys(options);
  if (categories.length > 0) {
    optionList = (
      <AutocompleteList ref={dropdownEl}>
        {categories.map((category, categoryIndex) => {
          return options[category].map((hit, index) => {
            let className;
            if (index === activeOption) {
              className = 'active';
            }

            const optionName = hit._source.name;
            return (
              <AutocompleteItem
                className={className}
                key={hit._id}
                onClick={handleItemClick}
              >
                {optionName}
              </AutocompleteItem>
            );
          });
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

export default EventsDropdown;
