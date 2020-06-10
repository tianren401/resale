import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyledRangeSliderDropdown,
  RangeSliderDropdownContainer,
} from './styledComponents';
import { RangeSlider } from '_components';
import { Box } from '_components/styledTags';
import {
  DropdownArrowUp,
  DropdownArrowDown,
} from '_components/dropdown/styledComponents';

export const RangeSliderDropdown = ({ minRange, maxRange, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClickAway = () => {
    isOpen && setIsOpen(false);
  };

  const className = isOpen ? 'active' : 'inactive';

  return (
    <StyledRangeSliderDropdown onMouseUp={handleOpen} className={className}>
      ${minRange || 0} - ${maxRange}
      {isOpen ? (
        <Box marginLeft="15px">
          <DropdownArrowUp width={10} />
        </Box>
      ) : (
        <Box marginLeft="15px">
          <DropdownArrowDown width={10} />
        </Box>
      )}
      {isOpen && (
        <RangeSliderDropdownContainer>
          <RangeSlider
            minRange={minRange || 0}
            maxRange={maxRange}
            handleClickAway={handleClickAway}
            handleChange={handleChange}
          />
        </RangeSliderDropdownContainer>
      )}
    </StyledRangeSliderDropdown>
  );
};

RangeSliderDropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  minRange: PropTypes.number,
  maxRange: PropTypes.number,
};
