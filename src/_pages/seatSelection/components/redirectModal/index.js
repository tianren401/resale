import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Modal } from '_components';
import alertIcon from '_images/alertIcon.svg';

const ModalMessage = styled.div`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  text-align: center;
  color: #272729;
  margin: 10px;
`;

export const RedirectModal = () => {
  const history = useHistory();

  const handleRedirect = () => {
    setTimeout(() => {
      history.push('/');
    }, 5000);
  };

  const modalStyles = {
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      width: '381px',
      height: '254px',
      borderRadius: '12px',
      margin: 'auto',
    },
  };

  return (
    <div>
      <Modal
        isOpen={true}
        customStyles={modalStyles}
        closeModal={() => null}
        close={handleRedirect()}
      >
        <img src={alertIcon} alt={'alert'} />
        <ModalMessage fontSize={'18px'} fontWeight={'600'}>
          Event Does not Exist
        </ModalMessage>
        <ModalMessage fontSize={'16px'} fontWeight={'normal'}>
          Looks like something went wrong. You will be redirected to the home
          page
        </ModalMessage>
      </Modal>
    </div>
  );
};

RedirectModal.propTypes = {
  isOpen: PropTypes.bool,
};
