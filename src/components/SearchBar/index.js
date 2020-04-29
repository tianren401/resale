import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
const SearchBar = ({ value, placeholder, onChange, ...rest }) => (
  <Autocomplete
    {...rest}
    value={value || null}
    placeholder={placeholder}
    onChange={(_, value) => onChange(value)}
  />
);

SearchBar.propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
