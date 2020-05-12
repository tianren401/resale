import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, Index } from 'react-instantsearch-dom';
import { Autocomplete } from './autocomplete';
import { LocationsDropdown } from './locationsDropdown';
import { EventsDropdown } from './eventsDropdown';
import { DayPicker, Flex } from '_components';
import { SearchContainer } from './styledComponents';

import { setDate, setQuery, setLocation } from '_store/search';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

export const SearchBar = ({ showLocation, showDate, ...rest }) => {
  const dispatch = useDispatch();

  const handleSetDate = (date) => {
    dispatch(setDate(date));
  };

  const handleSetQuery = (query) => {
    dispatch(setQuery(query));
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
    <SearchContainer>
      <Flex flex={3}>
        <InstantSearch indexName="events" searchClient={searchClient}>
          <Configure hitsPerPage={3} />
          <Autocomplete
            {...rest}
            value={searchQuery}
            placeholder="Search by..."
            onChange={(value) => handleSetQuery(value)}
            renderList={({ results, dropdownEl, ...rest }) => (
              <EventsDropdown ref={dropdownEl} results={results} {...rest} />
            )}
            hasNext={showLocation || showDate}
          />
          <Index indexName="events" />
          <Index indexName="performers" />
          <Index indexName="venues" />
        </InstantSearch>
      </Flex>
      {showLocation && (
        <Flex flex={1}>
          <InstantSearch indexName="venues" searchClient={searchClient}>
            <Configure hitsPerPage={3} />
            <Autocomplete
              {...rest}
              value={searchLocation}
              placeholder="Anywhere"
              onChange={(value) => handleSetLocation(value)}
              renderList={({ results, dropdownEl, onChange, ...rest }) => (
                <LocationsDropdown
                  ref={dropdownEl}
                  results={results}
                  onChange={onChange}
                  {...rest}
                />
              )}
            />
          </InstantSearch>
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
  );
};

SearchBar.propTypes = {
  showLocation: PropTypes.bool,
  showDate: PropTypes.bool,
  value: PropTypes.any,
};

SearchBar.defaultProps = {
  showDate: false,
  showLocation: false,
};
