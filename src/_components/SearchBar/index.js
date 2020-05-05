import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from './Autocomplete';
import LocationsDropdown from './LocationsDropdown';
import EventsDropdown from './EventsDropdown';
import DayPicker from '_components/DayPicker';
import { Flex } from '_components';
import { SearchContainer } from './StyledComponents';
import { setDate, setQuery, setLocation } from '_store/search';
import { searchService } from '_services';

const SearchBar = ({ ...rest }) => {
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
        <Autocomplete
          {...rest}
          fetchData={searchService.searchQuery}
          value={searchQuery}
          placeholder="Search by..."
          onChange={(value) => handleSetQuery(value)}
          renderList={(results) => (
            <EventsDropdown {...rest} results={results} />
          )}
        />
      </Flex>
      <Flex flex={1}>
        <Autocomplete
          {...rest}
          fetchData={searchService.searchLocation}
          value={searchLocation}
          placeholder="Anywhere"
          onChange={(value) => handleSetLocation(value)}
          renderList={(results) => (
            <LocationsDropdown {...rest} results={results} />
          )}
        />
      </Flex>
      <Flex flex={1}>
        <DayPicker
          value={'Anytime' || searchDate}
          onDateChange={(value) => handleSetDate(value)}
        />
      </Flex>
    </SearchContainer>
  );
};

SearchBar.propTypes = {
  value: PropTypes.any,
};

export default SearchBar;
