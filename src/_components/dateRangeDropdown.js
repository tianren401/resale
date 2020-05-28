import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { deviceSize } from '_constants';
import { Dropdown, DateRangePicker } from '_components';
import { setDate, setDateRange } from '_store/search';

const DatePickerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 100%;

  @media (max-width: ${deviceSize.tablet}px) {
    left: 0;
    top: 100%;
    position: absolute;
  }
`;

const DatePicker = ({ show, onChangeDateRange, weekendFilter }) => {
  return show ? (
    <DatePickerContainer>
      <DateRangePicker
        sendToContainer={onChangeDateRange}
        weekendFilter={weekendFilter}
      />
    </DatePickerContainer>
  ) : null;
};

DatePicker.propTypes = {
  show: PropTypes.bool,
  onChangeDateRange: PropTypes.func,
  weekendFilter: PropTypes.bool,
};

export const DateRangeDropdown = (props) => {
  const dispatch = useDispatch();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSetDate = ({ key }) => {
    dispatch(setDate(key));
    if (key === 'date') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleSelectDateRange = (days) => {
    // calc timestamps for  start/end
    const startDate = new Date(days[0]);
    const endDate = new Date(days[days.length - 1]);
    dispatch(
      setDateRange({
        start: startDate.getTime(),
        end: endDate.getTime(),
      })
    );
  };

  const options = [
    { key: 'all', label: 'Any Date' },
    { key: 'weekendsOnly', label: 'Weekends Only' },
    {
      key: 'date',
      label: 'Select Date',
      children: (
        <DatePicker
          show={showDatePicker}
          onChangeDateRange={handleSelectDateRange}
        />
      ),
    },
  ];

  const searchDate = useSelector(({ searchReducer }) => searchReducer.date);

  return (
    <Dropdown
      options={options}
      defaultOption={searchDate}
      handleChange={handleSetDate}
      {...props}
    />
  );
};