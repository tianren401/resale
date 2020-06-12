import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { loginCheckoutAction } from '_store/auth';
import closeModalButton from '_images/closeModal.svg';
import { shadows, colors } from '_constants';
import {
  H3,
  InputField,
  Modal,
  PrimaryButton,
  PasswordInputField,
} from '_components';

const modelStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '450px',
    borderRadius: '8px',
    padding: '24px 37px',
    boxShadow: `${shadows.small}`,
  },
  overlay: {
    background: `rgba(61, 61, 61, 0.8)`,
  },
};

const Title = styled(H3)`
  margin-bottom: 32px;
  text-align: center;
`;

const StyledInputField = styled(InputField).attrs({
  width: '100%',
  height: '73px',
})``;

const StyledPasswordInputField = styled(PasswordInputField).attrs({
  width: '100%',
  height: '73px',
})``;

const SubmitDiv = styled.div`
  width: 100%;
  margin-top: 87px;
`;

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  color: ${colors.brand};
  justify-content: flex-end;
  align-items: center;

  &:hover {
    color: ${colors.lightBrand};
  }
`;

const CloseButton = styled.img.attrs({
  width: '16px',
  height: '16px',
})`
  cursor: pointer;
`;
export const CheckoutLoginModal = ({ isOpenModal, closeModal }) => {
  const dispatch = useDispatch();
  const { passwordInputType } = useSelector((state) => state.uiReducer);

  const handleSubmit = (values) => {
    dispatch(
      loginCheckoutAction({
        email: values.modalEmail,
        password: values.modalPassword,
        success: () => {
          closeModal();
        },
      })
    );
  };
  const schema = Yup.object().shape({
    modalEmail: Yup.string()
      .email('Please enter correct email.')
      .required('Email is Required.'),
    modalPassword: Yup.string().required('Password is Required.'),
  });
  return (
    <Modal
      isOpen={isOpenModal}
      closeModal={closeModal}
      customStyles={modelStyles}
    >
      <Header>
        <CloseButton src={closeModalButton} onClick={closeModal} />
      </Header>
      <Title>Sign in</Title>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {(props) => (
          <StyledForm onSubmit={props.handleSubmit}>
            <Field
              id="modalEmail"
              placeholder="Email"
              type="text"
              component={StyledInputField}
              {...props}
            />
            <Field
              id="modalPassword"
              placeholder="Password"
              type={passwordInputType}
              component={StyledPasswordInputField}
              {...props}
            />
            <SubmitDiv>
              <PrimaryButton
                minWidth="100%"
                fontSize="14px"
                buttonSize="large"
                type="submit"
              >
                Login
              </PrimaryButton>
            </SubmitDiv>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

CheckoutLoginModal.propTypes = {
  isOpenModal: PropTypes.bool,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
};
