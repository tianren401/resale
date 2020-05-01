import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
import DayPicker from 'components/DayPicker';
import { Flex } from 'components';
const SearchBar = ({ value, placeholder, onChange, ...rest }) => (
  <Flex position="relative">
    <Autocomplete
      {...rest}
      value={value || null}
      placeholder={placeholder}
      onChange={(_, value) => onChange(value)}
    />
    <DayPicker />
  </Flex>
);

SearchBar.propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
