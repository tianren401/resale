import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0px 2px 3px 2px #DDD',
  },
};

export const Modal = ({ isOpen, onRequestClose, style, children }) => {
  ReactModal.setAppElement('body');
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        ...customStyles,
        ...style,
      }}
    >
      {children}
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
};
