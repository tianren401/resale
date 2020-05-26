import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { connectedAutocomplete as Autocomplete } from './autocomplete';
import { connectedPlaces as Places } from '_components/places';
import { LocationsAutocomplete } from './locationsAutocomplete';
import { EventsDropdown } from './eventsDropdown';
import { DayPicker, Flex } from '_components';
import { SearchContainer, FiltersContainer } from './styledComponents';

import { setDate, setQuery, setLocation, setResults } from '_store/search';
import { withInstantSearch } from '_hoc';
import { CategoriesDropdown } from './categoriesDropdown';
import { DateRangeDropdown } from './dateRangeDropdown';

const locationSearchConfig = {
  defaultIndex: 'venues',
  hitsPerPage: 3,
  multiple: false,
};

export const SearchBar = ({
  showLocation,
  showDate,
  showDropdown,
  showFilters,
  showAutocompleteIcon,
  placeholder,
  ...rest
}) => {
  const dispatch = useDispatch();

  const handleSetDate = (date) => {
    dispatch(setDate(date));
  };

  const handleSetQuery = (query) => {
    dispatch(setQuery(query));
  };

  const handleSearchResults = (results) => {
    dispatch(setResults(results));
  };

  const handleSetLocation = (location) => {
    dispatch(setLocation(location));
  };

  const searchQuery = useSelector(({ searchReducer }) => searchReducer.query);
  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );
  const searchDate = useSelector(({ searchReducer }) => searchReducer.date);

  return (
    <>
      <SearchContainer>
        <Flex flex={3}>
          <Autocomplete
            {...rest}
            value={searchQuery}
            placeholder={placeholder}
            onChange={handleSetQuery}
            onChangeResults={handleSearchResults}
            renderList={({ results, dropdownEl, ...rest }) => (
              <EventsDropdown ref={dropdownEl} results={results} {...rest} />
            )}
            hasNext={showLocation || showDate}
            showDropdown={showDropdown}
            showAutocompleteIcon={showAutocompleteIcon}
          />
        </Flex>
        {showLocation && (
          <Flex flex={1}>
            <Autocomplete
              {...rest}
              value={searchLocation}
              placeholder="Anywhere"
              onChange={(value) => handleSetLocation(value)}
              renderList={({ results, dropdownEl, onChange, ...rest }) => (
                <LocationsAutocomplete
                  ref={dropdownEl}
                  results={results}
                  onChange={onChange}
                  {...rest}
                />
              )}
              config={locationSearchConfig}
              showDropdown={showDropdown}
              showAutocompleteIcon={showAutocompleteIcon}
            />
          </Flex>
        )}
        {showDate && (
          <Flex flex={1}>
            <DayPicker
              value={'Anytime' || searchDate}
              onDateChange={(value) => handleSetDate(value)}
            />
          </Flex>
        )}
      </SearchContainer>
      {showFilters && (
        <FiltersContainer>
          <Flex flex={1} justify="center">
            <CategoriesDropdown />
          </Flex>
          <Flex flex={1} justify="center">
            <Places
              defaultRefinement={{
                lat: 32.8203525,
                lng: -97.011731,
              }}
            />
          </Flex>
          <Flex flex={1} justify="center">
            <DateRangeDropdown />
          </Flex>
        </FiltersContainer>
      )}
    </>
  );
};

SearchBar.propTypes = {
  showLocation: PropTypes.bool,
  showDate: PropTypes.bool,
  showDropdown: PropTypes.bool,
  showAutocompleteIcon: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  showFilters: PropTypes.bool,
};

SearchBar.defaultProps = {
  showDate: false,
  showLocation: false,
  showDropdown: true,
  placeholder: '',
  showAutocompleteIcon: true,
  showFilters: false,
};

export const connectedSearch = withInstantSearch(SearchBar);
