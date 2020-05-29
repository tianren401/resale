import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  DropdownArrowUp,
  DropdownArrowDown,
} from '_components/dropdown/styledComponents';

import { useClickAway } from '_hooks';

import { Box } from '_components/styledTags';
import { colors } from '_constants';

const StyledSliderDropdown = styled.div`
  background-color: white;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  user-select: none;
  width: ${(props) => (props.width ? props.width : '179px')};
  color: ${colors.black};
  min-width: 179px;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  border: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  border-radius: 6px;

  &:hover {
    border-color: ${colors.brandHover};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(130, 136, 148, 0.16);
  }

  &:focus{
    box-shadow: none;
    border-color: ${colors.brandHover};
    background: linear-gradient(0deg, rgba(103, 38, 241, 0.16), rgba(103, 38, 241, 0.16)), #FFFFFF;
  }

  &.active {
    border-color: ${colors.brandHover};
    color: color: linear-gradient(0deg, rgba(39, 39, 41, 0.16), rgba(39, 39, 41, 0.16)), #6726F1;
    border-color: ${colors.brand};
  }
`;

const SliderContainer = styled.div`
  background-color: white;
  height: 150px;
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  margin-top: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  border-radius: 6px;
`;

const SliderValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42px;
`;

const SliderValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  width: 74px;
  font-size: 14px;
  color: #6726f1;
  border: 1px solid #e6e6eb;
  border-radius: 6px;
`;

const Dash = styled.div`
  height: 0px;
  width: 16px;
  margin: 10px;
  background: #8d8d94;
  border: 1px solid #8d8d94;
`;

const Slider = styled.div`
  pointer-events: none;
  position: relative;
  height: 24px;
  left: -140px;
  margin: 15px 0;

  input {
    -webkit-appearance: none;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 15px;
    width: 280px;
    outline: none;
    height: 18px;
    margin: 0;
    padding: 0;
    border-radius: 8px;
  }

  /* For Chrome styling */
  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    position: relative;
    margin: -10px 0;
    z-index: 1;
    outline: 0;
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(130, 136, 148, 0.16);
  }

  input::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: #6726f1;
    border-radius: 2px;
  }

  /* All the same stuff for FireFox */
  input::-moz-range-thumb {
    pointer-events: all;
    position: relative;
    z-index: 1;
    outline: 0;
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(130, 136, 148, 0.16);
  }

  input::-moz-range-trackk {
    width: 100%;
    height: 4px;
    background: #6726f1;
    border-radius: 2px;
  }

  /* All the same stuff for IE */
  input::-ms-thumb {
    pointer-events: all;
    position: relative;
    z-index: 1;
    outline: 0;
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(130, 136, 148, 0.16);
  }

  input::-ms-track {
    width: 100%;
    height: 4px;
    background: #6726f1;
    border-radius: 2px;
  }
`;

export const RangeSlider = ({
  maxRange,
  minRange,
  handleClickAway,
  handleChange,
}) => {
  const [slider1, setSlider1] = useState(minRange);
  const [slider2, setSlider2] = useState(maxRange);

  const ref = useRef();
  useClickAway({ ref, handleClickAway });

  const updatePriceLabels = (e, slider) => {
    let val1, val2;

    if (slider === 'one') {
      val1 = e.target.value;
      val2 = slider2;
    } else if (slider === 'two') {
      val1 = slider1;
      val2 = e.target.value;
    }

    if (val1 >= val2) {
      setSlider1(val2 - 1);
      setSlider2(val2);
      handleChange(val1, val2);
      return;
    } else if (val2 <= val1) {
      setSlider1(val1 + 1);
      setSlider2(val1);
      handleChange(val1, val2);
      return;
    } else {
      setSlider1(val1);
      setSlider2(val2);
      handleChange(val1, val2);
    }

    console.log(slider1, slider2);
  };

  return (
    <SliderContainer ref={ref}>
      <SliderValueContainer>
        <SliderValue>${slider1}</SliderValue>
        <Dash />
        <SliderValue>${slider2}</SliderValue>
      </SliderValueContainer>
      <Slider>
        <input
          value={slider1}
          min={minRange}
          max={maxRange}
          type="range"
          onChange={(e) => updatePriceLabels(e, 'one')}
        ></input>
        <input
          value={slider2}
          min={minRange}
          max={maxRange}
          type="range"
          onChange={(e) => updatePriceLabels(e, 'two')}
        ></input>
      </Slider>
    </SliderContainer>
  );
};

export const SliderDropdown = ({ minRange, maxRange, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClickAway = () => {
    isOpen && setIsOpen(false);
  };

  const className = isOpen ? 'active' : 'inactive';

  return (
    <StyledSliderDropdown onMouseUp={handleOpen} className={className}>
      ${minRange} - ${maxRange}
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
        <RangeSlider
          minRange={minRange}
          maxRange={maxRange}
          handleClickAway={handleClickAway}
          handleChange={handleChange}
        />
      )}
    </StyledSliderDropdown>
  );
};

RangeSlider.propTypes = {
  handleClickAway: PropTypes.any,
  handleChange: PropTypes.any,
  minRange: PropTypes.any,
  maxRange: PropTypes.any,
};

SliderDropdown.propTypes = {
  handleChange: PropTypes.any,
  minRange: PropTypes.any,
  maxRange: PropTypes.any,
};
