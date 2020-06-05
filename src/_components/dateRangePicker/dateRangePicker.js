import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactDayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { shadows, colors, deviceSize } from '_constants';
import { isMobileDevice } from '_helpers';
import dayPickerLeftArrow from '_images/dayPickerLeftArrow.svg';
import dayPickerRightArrow from '_images/dayPickerRightArrow.svg';
import { dateRangePickerStyleOverrides } from './dateRangePickerStyleOverrides';

const StyledDayPicker = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  ${!isMobileDevice && `box-shadow: ${shadows.small};`}
  border-radius: 8px;
  ${dateRangePickerStyleOverrides}
`;

const Image = styled.img`
  height: 20px;
  cursor: pointer;
  position: relative;
  top: 20px;
  padding: 0 15px;
`;

const ApplyButton = styled.div`
  text-align: center;
  background: ${colors.lightBrand};
  border-radius: 0px 0px 8px 8px;
  cursor: pointer;
  color: ${colors.brand};
  padding: 10px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${deviceSize.tablet}px) {
    width: initial;
    margin: 200px 20px 0px 20px;
    background: rgba(103, 38, 241, 0.16);
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    padding-top: 13px;
    padding-bottom: 13px;
  }
`;

const NavbarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 0px;

  @media (max-width: ${deviceSize.tablet}px) {
    max-width: initial;
    padding: 0 40px;
  }
`;

const Navbar = ({ onPreviousClick, onNextClick, className }) => {
  return (
    <NavbarHeader className={className}>
      <Image onClick={() => onPreviousClick()} src={dayPickerLeftArrow} />
      <Image onClick={() => onNextClick()} src={dayPickerRightArrow} />
    </NavbarHeader>
  );
};

export const DateRangePicker = ({ sendToContainer, weekendFilter }) => {
  const [includedDays, setIncludedDays] = useState([]);
  const [mobileRange, setMobileRange] = useState({
    from: null,
    to: null,
  });
  const [desktopRange, setDesktopRange] = useState({
    from: null,
    to: null,
    enteredTo: null,
  });

  const getDates = (startDate, endDate) => {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    setIncludedDays(dates);
  };

  const handleDateSend = (days) => {
    sendToContainer(days);
  };

  const isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  const handleDayClickMobile = (day) => {
    const selectedRange = DateUtils.addDayToRange(day, mobileRange);
    setMobileRange(selectedRange);
    if (selectedRange.to && selectedRange.from) {
      getDates(selectedRange.from, selectedRange.to);
    }
  };

  const handleDayClickDesktop = (day) => {
    const { from, to } = desktopRange;
    if (from && to && day >= from && day <= to) {
      handleResetClick();
      return;
    }
    if (isSelectingFirstDay(from, to, day)) {
      setDesktopRange({
        ...desktopRange,
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      setDesktopRange({ ...desktopRange, to: day, enteredTo: day });
      if (desktopRange.enteredTo === null) {
        getDates(desktopRange.from, desktopRange.from);
      } else {
        getDates(desktopRange.from, desktopRange.enteredTo);
      }
    }
  };

  const handleDayMouseEnter = (day) => {
    if (!isMobileDevice) {
      const { from, to } = desktopRange;
      if (!isSelectingFirstDay(from, to, day)) {
        setDesktopRange({ ...desktopRange, enteredTo: day });
      }
    } else {
      return null;
    }
  };

  const handleResetClick = () => {
    setDesktopRange({
      from: null,
      to: null,
      enteredTo: null,
    });
  };

  let from;
  let to;
  let modifiers;
  let enteredTo;

  if (isMobileDevice) {
    from = mobileRange.from;
    to = mobileRange.to;
    modifiers = { start: from, end: to };
  } else {
    from = desktopRange.from;
    to = desktopRange.to;
    enteredTo = desktopRange.enteredTo;
    modifiers = { start: from, end: enteredTo };
  }

  const selectedDays = [from, { from, to: enteredTo }];

  return (
    <StyledDayPicker>
      <ReactDayPicker
        navbarElement={<Navbar />}
        className={isMobileDevice ? 'Selectable' : 'Range'}
        fromMonth={from}
        selectedDays={isMobileDevice ? [from, { from, to }] : selectedDays}
        modifiers={modifiers}
        onDayClick={
          isMobileDevice ? handleDayClickMobile : handleDayClickDesktop
        }
        onDayMouseEnter={handleDayMouseEnter}
        showOutsideDays
        disabledDays={weekendFilter && { daysOfWeek: [1, 2, 3, 4, 5] }}
      />
      <ApplyButton
        onClick={(e) => {
          handleDateSend(includedDays);
          e.stopPropagation();
        }}
      >
        Apply
      </ApplyButton>
    </StyledDayPicker>
  );
};

DateRangePicker.propTypes = {
  sendToContainer: PropTypes.func,
  weekendFilter: PropTypes.bool,
};

Navbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  className: PropTypes.any,
};
