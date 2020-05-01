import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
import DayPicker from 'components/DayPicker';
import { Flex } from 'components';
import { SearchContainer } from './StyledComponents';

const SearchBar = ({ value, fetchQuery, fetchLocation, ...rest }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);

  useEffect(() => {
    // fetch elastic api
  }, [query, date, location]);

  return (
    <SearchContainer>
      <Flex flex={3}>
        <Autocomplete
          {...rest}
          fetchData={fetchQuery}
          value={value || null}
          placeholder="Search by..."
          onChange={(value) => setQuery(value)}
        />
      </Flex>
      <Flex flex={1}>
        <Autocomplete
          {...rest}
          fetchData={fetchLocation}
          value={value || null}
          placeholder="Anywhere"
          onChange={(value) => setLocation(value)}
        />
      </Flex>
      <Flex flex={1}>
        <DayPicker value="Anytime" onDateChange={(value) => setDate(value)} />
      </Flex>
    </SearchContainer>
  );
};

SearchBar.propTypes = {
  value: PropTypes.any,
};

export default SearchBar;
