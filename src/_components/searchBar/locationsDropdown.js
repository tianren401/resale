import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  AutocompleteItem,
  AutocompleteList,
  EmptyListContainer,
} from './styledComponents';

export const LocationsDropdown = React.forwardRef((props, ref) => {
  const { activeOption, handleItemClick, results, onChange } = props;

  const handleLocationClick = (event, data) => {
    handleItemClick(event);
    onChange(data.name);
  };
  // map data
  const options = _.chain(results).slice(0, 10).value();
  let optionList = null;

  if (options.length) {
    optionList = (
      <AutocompleteList ref={ref}>
        {options.map((hit, index) => {
          let className;
          if (index === activeOption) {
            className = 'active';
          }

          const { name: venueName, id } = hit;

          return (
            <AutocompleteItem
              className={className}
              key={id}
              onClick={(e) => handleLocationClick(e, hit)}
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

LocationsDropdown.propTypes = {
  onChange: PropTypes.func,
  activeOption: PropTypes.number,
  handleItemClick: PropTypes.func,
  results: PropTypes.any,
};
