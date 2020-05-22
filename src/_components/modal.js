import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

export const Modal = ({ isOpen, onRequestClose, customStyles, children }) => {
  ReactModal.setAppElement('body');
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
  onRequestClose: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  children: PropTypes.any,
};
