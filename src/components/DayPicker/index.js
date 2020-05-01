import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import styled from 'styled-components';
import { colors } from 'theme';
import { Flex } from 'components';
import { ErrorAlert } from './ErrorAlert';

const DayPickerContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-direction: column;
  background: ${colors.white};
  z-index: 2;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 10.0801px;

  > .DayPickerInput {
    height: 100% !important;
    display: flex;
    aligin-items: center;
    flex-direction: column;
    justify-content: center;

    input {
      &:focus {
        outline: none;
      }
      font-size: 1rem;
      border: none;
    }
  }
`;

const DayPicker = ({ value, dateError, handleDateChange }) => {
  return (
    <Flex height="60px" width="100%">
      <DayPickerContainer show>
        {dateError && <ErrorAlert msg="Date is required" />}
        <DayPickerInput value={value} onDayChange={handleDateChange} />
      </DayPickerContainer>
    </Flex>
  );
};

DayPicker.propTypes = {
  value: PropTypes.any,
  dateError: PropTypes.string,
  handleDateChange: PropTypes.func,
};

export default DayPicker;
