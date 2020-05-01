import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
import DayPicker from 'components/DayPicker';
import { Flex } from 'components';
import { SearchContainer } from './StyledComponents';
const SearchBar = ({ value, onChange, ...rest }) => (
  <SearchContainer>
    <Flex flex={3}>
      <Autocomplete
        {...rest}
        value={value || null}
        placeholder="Search by..."
        onChange={(_, value) => onChange(value)}
      />
    </Flex>
    <Flex flex={1}>
      <Autocomplete
        {...rest}
        value={value || null}
        placeholder="Anywhere"
        onChange={(_, value) => onChange(value)}
      />
    </Flex>
    <Flex flex={1}>
      <DayPicker value="Anytime" />
    </Flex>
  </SearchContainer>
);

SearchBar.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
