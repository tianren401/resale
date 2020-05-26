import React from 'react';
import PropTypes from 'prop-types';

export const DropdownArrow = ({ dropdownOpen }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill={dropdownOpen ? '#6726F1' : 'black'}
      transform={dropdownOpen && 'rotate(180)'}
    >
      <path d="M4.29088 5.70641L0.293728 1.71116C0.105657 1.52318 0 1.26822 0 1.00237C0 0.448778 0.448992 0 1.00285 0L8.99715 0C9.26312 0 9.5182 0.105607 9.70627 0.293589C10.0979 0.68504 10.0979 1.31971 9.70627 1.71116L5.70912 5.70641C5.31748 6.09786 4.68252 6.09786 4.29088 5.70641Z" />
    </svg>
  );
};

DropdownArrow.propTypes = {
  dropdownOpen: PropTypes.bool,
};
