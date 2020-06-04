import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';

import { colors, deviceSize } from '_constants';
import closeModalButton from '_images/closeModal.svg';
import leftArrow from '_images/purpleArrowLeft.svg';
import { InputField, Form, Checkbox, PasswordInputField } from '_components';
import { useModal } from '_hooks/useModal';
import { isMobileDevice } from '_helpers';

const StyledForm = styled(Form)`
  @media (max-width: ${deviceSize.tablet}px) {
    flex-direction: column;
  }
`;

const Header = styled.div`
  display: flex;
  color: #6726f1;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${deviceSize.tablet}px) {
    justify-content: flex-start;
  }
`;

const CloseButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;

  @media (max-width: ${deviceSize.tablet}px) {
    position: static;
    top: initial;
    right: initial;
    margin-right: 10px;
  }
`;

const Title = styled.div`
  text-align: center;
  padding-bottom: 20px;
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;
`;

const ForgotPasswordText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #8d8d94;
  text-align: left;
  margin: 16px 0px 6px 0px;
`;

const NoAccountText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #8d8d94;
  text-align: left;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 20px 32px 18px 32px;
  background-color: ${colors.brand};
  border-radius: 6px;
  border: none;
  font-size: 16px;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SwitchButton = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 20px 32px 18px 32px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid ${colors.brand};
  font-size: 16px;
  color: ${colors.brand};
`;

const SwitchText = styled.span`
  cursor: pointer;
  color: ${colors.brand};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

const LoginForm = (props) => {
  const { handleSubmit, loginType } = props;
  const [isChecked, setIsChecked] = useState(false);
  const reducer = (state) => state.authReducer;
  const { loading } = useSelector(reducer);
  const { closeModal } = useModal();
  const [localLoginType, setLocalLoginType] = useState(loginType);
  const uiReducer = (state) => state.uiReducer;
  const { passwordInputType } = useSelector(uiReducer);

  return (
    <div>
      <Header>
        <CloseButton
          src={isMobileDevice ? leftArrow : closeModalButton}
          onClick={closeModal}
        />
        {isMobileDevice && <div>Back</div>}
      </Header>
      <Title>{localLoginType}</Title>
      <StyledForm
        initialValues={{ email: '', password: '' }}
        handleSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Please enter correct email.')
            .required('Email cannot be blank.'),
          password: Yup.string().required('Password cannot be blank.'),
        })}
      >
        {(props) => (
          <>
            {localLoginType === 'Sign Up' && (
              <Field
                id="fullName"
                type="text"
                width={isMobileDevice ? 'auto' : '380px'}
                height="auto"
                placeholder="Full Name"
                component={InputField}
                {...props}
              />
            )}
            <Field
              id="email"
              type="text"
              width={isMobileDevice ? 'auto' : '380px'}
              height="auto"
              placeholder="Email"
              component={InputField}
              {...props}
            />
            {localLoginType === 'Sign Up' && (
              <Field
                id="phone"
                type="text"
                width={isMobileDevice ? 'auto' : '380px'}
                height="auto"
                placeholder="Phone"
                component={InputField}
                {...props}
              />
            )}
            <Field
              id="password"
              type={passwordInputType}
              width={isMobileDevice ? 'auto' : '380px'}
              height="50px"
              placeholder="Password"
              component={PasswordInputField}
              {...props}
            />
            {localLoginType === 'Log In' && (
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            )}
            {localLoginType === 'Sign Up' && !isMobileDevice && (
              <Checkbox
                label={'Get updates on sports, concerts, and events'}
                checked={isChecked}
                handleChange={() => setIsChecked(!isChecked)}
              />
            )}
            <Button type="submit">{loading ? '...' : localLoginType}</Button>
            {localLoginType === 'Log In' && isMobileDevice ? (
              <SwitchButton onClick={() => setLocalLoginType('Sign Up')}>
                Sign Up
              </SwitchButton>
            ) : (
              localLoginType === 'Log In' &&
              !isMobileDevice && (
                <NoAccountText>
                  Need a SelectSeats account?{' '}
                  <SwitchText onClick={() => setLocalLoginType('Sign Up')}>
                    Sign up here
                  </SwitchText>{' '}
                </NoAccountText>
              )
            )}
          </>
        )}
      </StyledForm>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginType: PropTypes.string,
};

export default LoginForm;
