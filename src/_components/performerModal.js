import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import closeModalButton from '_images/closeModal.svg';
import { DateRangePicker } from './dateRangePicker/dateRangePicker';
import { setDate, setDateRange } from '_store/search';

const Modal = styled.div`
  position: absolute;
  z-index: 1;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  color: #6726f1;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #e6e6eb;
`;

const DayPickerSection = styled.div`
  text-align: center;
`;

const CloseButton = styled.img``;

const Text = styled.div`
  margin: 0 auto;
`;

export const PerformerModal = ({ sendStateFromModal }) => {
  const handleClose = () => {
    sendStateFromModal(false);
  };

  const dispatch = useDispatch();

  const handleSelectDateRange = (days) => {
    // calc timestamps for  start/end
    const startDate = new Date(days[0]);
    const endDate = new Date(days[days.length - 1]);
    dispatch(setDate('date'));
    dispatch(
      setDateRange({
        start: startDate.getTime(),
        end: endDate.getTime(),
      })
    );
  };

  return (
    <Modal>
      <Header>
        <CloseButton src={closeModalButton} onClick={handleClose} />
        <Text>Calendar</Text>
      </Header>
      <DayPickerSection>
        <DateRangePicker sendToContainer={handleSelectDateRange} />
      </DayPickerSection>
    </Modal>
  );
};

PerformerModal.propTypes = {
  sendStateFromModal: PropTypes.func,
};
