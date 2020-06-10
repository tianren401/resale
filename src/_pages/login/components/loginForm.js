import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import closeModalButton from '_images/closeModal.svg';
import leftArrow from '_images/purpleArrowLeft.svg';
import { InputField, PasswordInputField } from '_components';
import { setLoginType } from '_store/ui';
import { useModal } from '_hooks/useModal';
import { isMobileDevice } from '_helpers';
import {
  StyledModal,
  StyledForm,
  Header,
  CloseButton,
  Title,
  ForgotPasswordText,
  NoAccountText,
  Button,
  SwitchButton,
  SwitchText,
  ErrorMessage,
  SuccessMessage,
} from './styledComponents';

const LoginForm = (props) => {
  const { handleSubmit, loginMessage } = props;
  const authReducer = (state) => state.authReducer;
  const { loading } = useSelector(authReducer);
  const { closeModal } = useModal();
  const uiReducer = (state) => state.uiReducer;
  const { passwordInputType, loginType } = useSelector(uiReducer);
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const dispatch = useDispatch();
  const handleModalSwitch = () => {
    dispatch(setLoginType('Sign Up'));
  };

  return (
    <StyledModal>
      <Header>
        <CloseButton
          src={isMobileDevice ? leftArrow : closeModalButton}
          onClick={closeModal}
        />
        {isMobileDevice && <div>Back</div>}
      </Header>
      <Title>{loginType}</Title>
      <StyledForm
        initialValues={{ email: '', password: '', fullName: '', phone: '' }}
        handleSubmit={handleSubmit}
        validationSchema={
          loginType === 'Sign Up'
            ? Yup.object().shape({
                email: Yup.string()
                  .email('Please enter correct email.')
                  .required('Email is Required.'),
                password: Yup.string().required('Password is Required.'),
                fullName: Yup.string().required('Name is Required.'),
                phone: Yup.string()
                  .matches(phoneRegExp, 'Phone number is not valid')
                  .required('Phone Number is Required.'),
              })
            : Yup.object().shape({
                email: Yup.string()
                  .email('Please enter correct email.')
                  .required('Email is Required.'),
                password: Yup.string().required('Password is Required.'),
              })
        }
      >
        {(props) => (
          <>
            {loginMessage && loginMessage.includes('Successful') ? (
              <SuccessMessage>{loginMessage}</SuccessMessage>
            ) : (
              loginMessage && <ErrorMessage>{loginMessage}</ErrorMessage>
            )}
            {loginType === 'Sign Up' && (
              <Field
                id="fullName"
                type="text"
                width={isMobileDevice ? '100%' : '380px'}
                height="auto"
                placeholder="Full Name"
                component={InputField}
                {...props}
              />
            )}
            <Field
              id="email"
              type="text"
              width={isMobileDevice ? '100%' : '380px'}
              height="auto"
              placeholder="Email"
              component={InputField}
              {...props}
            />
            {loginType === 'Sign Up' && (
              <Field
                id="phone"
                type="text"
                width={isMobileDevice ? '100%' : '380px'}
                height="auto"
                placeholder="Phone"
                component={InputField}
                {...props}
              />
            )}
            <Field
              id="password"
              type={passwordInputType}
              width={isMobileDevice ? '100%' : '380px'}
              height="50px"
              placeholder="Password"
              component={PasswordInputField}
              {...props}
            />
            {loginType === 'Sign In' && (
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            )}
            <Button type="submit">{loading ? '...' : loginType}</Button>
            {loginType === 'Sign In' && isMobileDevice ? (
              <SwitchButton onClick={handleModalSwitch}>Sign Up</SwitchButton>
            ) : (
              loginType === 'Sign In' &&
              !isMobileDevice && (
                <NoAccountText>
                  Need a SelectSeats account?{' '}
                  <SwitchText onClick={handleModalSwitch}>
                    Sign up here
                  </SwitchText>{' '}
                </NoAccountText>
              )
            )}
          </>
        )}
      </StyledForm>
    </StyledModal>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginType: PropTypes.string,
  loginMessage: PropTypes.string,
};

export default LoginForm;
