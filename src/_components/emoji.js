import React from 'react';
import PropTypes from 'prop-types';

export const Emoji = ({ label, symbol }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);

Emoji.propTypes = {
  label: PropTypes.string,
  symbol: PropTypes.string,
};
