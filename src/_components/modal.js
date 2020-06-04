import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

export const Modal = ({ isOpen, closeModal, customStyles, children }) => {
  ReactModal.setAppElement('body');

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        ...customStyles,
      }}
    >
      {children}
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  children: PropTypes.any,
};
