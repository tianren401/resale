import styled from 'styled-components';

export const StyledRangeSlider = styled.div`
  height: ${(props) => (props.height ? props.height : '150px')};
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
`;

export const Slider = styled.div`
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

export const SliderValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42px;
`;

export const SliderValue = styled.div`
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

export const Dash = styled.div`
  height: 0px;
  width: 16px;
  margin: 10px;
  background: #8d8d94;
  border: 1px solid #8d8d94;
`;
