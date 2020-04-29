import React from 'react';
import PropTypes from 'prop-types';
import AsyncAutocomplete from './AsyncAutocomplete';
const SearchBar = ({
  name,
  label,
  value,
  placeholder,
  required,
  controlProps = {},
  inputProps = {},
  showError,
  errorMessage,
  onChange,
  ...rest
}) => (
  <AsyncAutocomplete
    {...rest}
    {...controlProps}
    value={value || null}
    onChange={(_, value) => onChange(value)}
    inputProps={{
      ...inputProps,
      label,
      name,
      required,
      placeholder,
      error: showError,
      helperText: errorMessage,
      fullWidth: true,
      margin: 'normal',
    }}
  />
);

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  controlProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default SearchBar;
