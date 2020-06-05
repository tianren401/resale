import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import closeModalButton from '_images/closeModal.svg';
import { DateRangePicker } from './dateRangePicker/dateRangePicker';
import { setDate, setDateRange } from '_store/search';
import { zIndexes } from '_constants';
import { Modal } from '_components';

const modalStyles = {
  content: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    padding: '0px',
    zIndex: zIndexes.OVERLAY,
  },
};

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

export const PerformerModal = ({ sendStateFromModal, show }) => {
  const handleClose = (e) => {
    sendStateFromModal(false);
    e.stopPropagation();
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
    sendStateFromModal(false);
  };

  return (
    <Modal isOpen={show} customStyles={modalStyles} closeModal={handleClose}>
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
  show: PropTypes.bool,
};
