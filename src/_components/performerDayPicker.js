import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isMobileDevice } from '_helpers';
import { deviceSize } from '_constants';
import { DropdownArrow } from './dropdownArrow';
import check from '_images/checkImageDesktop.png';
import purpleRightArrow from '_images/purpleRightArrow.svg';
import { DateRangePicker } from './dateRangePicker/dateRangePicker';

const DayPickerDropdownContainer = styled.div`
  max-width: 150px;
`;

const DayPickerDropdown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 10px;
  min-width: 130px;
  border: 1px solid #e6e6eb;
  border-radius: 6px;
  cursor: pointer;
  ${({ dropdownOpen }) =>
    dropdownOpen &&
    'background: linear-gradient(0deg, rgba(103, 38, 241, 0.16), rgba(103, 38, 241, 0.16)), #FFFFFF;'}

  @media (max-width: ${deviceSize.tablet}px) {
    font-size: 18px;
    line-height: 22px;
    border: 1px solid #e6e6eb;
    border-radius: 6px;
    text-align: center;
    padding: 15px;
    margin: 0px;
  };
`;

const DropdownList = styled.div`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  border-radius: 6px;
  border: 1px solid #e6e6eb;
  min-width: 200px;
  height: 140px;
  background-color: white;
`;

const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  height: 30%;
  ${({ selected }) => selected && 'background: rgba(103, 38, 241, 0.16);'};
`;

const CalendarRow = styled.div`
  display: flex;
  position: absolute;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const StyledDropdownArrow = styled(DropdownArrow)``;

export const PerformerDayPicker = ({ sendToPerformerSection, onClick }) => {
  const getDatesFromChild = (days) => {
    sendToPerformerSection(days);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dayPickerVisible, setDayPickerVisible] = useState(false);

  const [weekendFilter, setWeekendFilter] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(0);

  const closeDropDown = () => {
    setDropdownOpen(!dropdownOpen);
    if (dayPickerVisible) {
      setDayPickerVisible(false);
    }
  };

  const handleDropdownClick = () => {
    closeDropDown();
    if (isMobileDevice) {
      setDayPickerVisible(!dayPickerVisible);
    }
  };

  const handleFilterSelect = (weekend, selected, visible) => {
    setWeekendFilter(weekend);
    setSelectedFilter(selected);
    if (visible) {
      setDayPickerVisible(visible);
    }
  };

  return (
    <DayPickerDropdownContainer onClick={onClick}>
      <DayPickerDropdown
        onClick={!isMobileDevice && handleDropdownClick}
        dropdownOpen={dropdownOpen}
      >
        Any Date
        <StyledDropdownArrow dropdownOpen={dropdownOpen} />
      </DayPickerDropdown>
      <CalendarRow>
        {dropdownOpen && !isMobileDevice && (
          <DropdownList>
            <DropdownItem
              onClick={() => handleFilterSelect(false, 0)}
              selected={selectedFilter === 0}
            >
              <div>Any Date</div>
              {!weekendFilter && <Image src={check} />}
            </DropdownItem>
            <DropdownItem
              onClick={() => handleFilterSelect(true, 1)}
              selected={selectedFilter === 1}
            >
              <div>Weekends Only</div>
              {weekendFilter && <Image src={check} />}
            </DropdownItem>
            <DropdownItem
              onClick={() => handleFilterSelect(false, 2, !dayPickerVisible)}
              selected={selectedFilter === 2}
            >
              <div>Select Date</div>
              <Image src={purpleRightArrow} />
            </DropdownItem>
          </DropdownList>
        )}
        {dayPickerVisible && (
          <DateRangePicker
            sendToContainer={getDatesFromChild}
            weekendFilter={weekendFilter}
          />
        )}
      </CalendarRow>
    </DayPickerDropdownContainer>
  );
};

PerformerDayPicker.propTypes = {
  sendToPerformerSection: PropTypes.func,
  onClick: PropTypes.func,
};
