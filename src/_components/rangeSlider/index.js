import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  StyledRangeSlider,
  Slider,
  SliderValueContainer,
  SliderValue,
  Dash,
} from './styledComponents';
import { useClickAway } from '_hooks';

export const RangeSlider = ({
  maxRange,
  minRange,
  handleClickAway,
  handleChange,
}) => {
  const [slider1, setSlider1] = useState(minRange || 0);
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
  };

  return (
    <StyledRangeSlider ref={ref}>
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
    </StyledRangeSlider>
  );
};

RangeSlider.propTypes = {
  minRange: PropTypes.number,
  maxRange: PropTypes.number.isRequired,
  handleClickAway: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
};
