import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import styled from 'styled-components';
import { colors } from '_constants';
import { Flex } from '_components';
import { ErrorAlert } from './errorAlert';

const DayPickerContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-direction: column;
  background: ${colors.white};
  z-index: 2;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 10px;

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
      color: ${colors.darkGray};
      border: none;
      font-weight: normal;
      font-size: 1.125rem;
      line-height: 22px;
    }
  }
`;

export const DayPicker = ({ value, dateError, onDateChange }) => {
  return (
    <Flex height="60px" width="100%">
      <DayPickerContainer show>
        {dateError && <ErrorAlert msg="Date is required" />}
        <DayPickerInput value={value} onDayChange={onDateChange} />
      </DayPickerContainer>
    </Flex>
  );
};

DayPicker.propTypes = {
  value: PropTypes.any,
  dateError: PropTypes.string,
  onDateChange: PropTypes.func,
};
