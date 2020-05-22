import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import closeModalButton from '_images/closeModal.svg';
import { DateRangePicker } from './dateRangePicker/dateRangePicker';

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

export const PerformerModal = ({ sendStateFromModal, sendDaysFromModal }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const getDatesFromChild = (days) => {
    setSelectedDays(days);
  };

  const handleClose = () => {
    sendStateFromModal(false);
    sendDaysFromModal(selectedDays);
  };

  return (
    <Modal>
      <Header>
        <CloseButton src={closeModalButton} onClick={handleClose} />
        <Text>Calendar</Text>
      </Header>
      <DayPickerSection>
        <DateRangePicker sendToContainer={getDatesFromChild} />
      </DayPickerSection>
    </Modal>
  );
};

PerformerModal.propTypes = {
  sendStateFromModal: PropTypes.func,
  sendDaysFromModal: PropTypes.func,
};
