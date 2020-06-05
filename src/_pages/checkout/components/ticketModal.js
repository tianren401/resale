import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Modal, SecondaryButton } from '_components';
import { colors } from '_constants';

const modelStyles = {
  content: {
    top: '15%',
    left: '20px',
    right: '20px',
    bottom: 'auto',
    borderRadius: '8px',
    border: 'none',
    background: `${colors.white}`,
    padding: '0 20px',
  },
  overlay: {
    background: `rgba(50, 50, 50, 0.8)`,
  },
};

const VFS = styled.div`
  width: 100%;
  min-height: 210px;
  margin: 32px 0 24px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => props.image};
`;

const TicketContent = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${colors.black2};
`;

const StyledSecondaryButton = styled(SecondaryButton)`
  margin: 20px 0;
`;

export const TicketModal = ({ isOpenModal, closeModal }) => {
  const { vfsURL, event, ticketGroupSection, ticketGroupRow } = useSelector(
    (state) => state.checkoutTicketReducer
  );

  const date = format(new Date(event.date), "EEEE MMM do 'at' h:mma");
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      customStyles={modelStyles}
    >
      {!!vfsURL && <VFS image={`url(${vfsURL})`} />}
      <div>
        <TicketContent>{date}</TicketContent>
        <TicketContent>
          {event.city}, {event?.stateProvince} · {event.venue}
        </TicketContent>
        <TicketContent color={colors.darkGray}>
          Section {ticketGroupSection}, Row {ticketGroupRow}
        </TicketContent>
      </div>
      <StyledSecondaryButton minWidth="100%" onClick={closeModal}>
        Close
      </StyledSecondaryButton>
    </Modal>
  );
};

TicketModal.propTypes = {
  isOpenModal: PropTypes.bool,
  closeModal: PropTypes.func,
};
