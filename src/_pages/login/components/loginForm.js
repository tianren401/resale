import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import closeModalButton from '_images/closeModal.svg';
import leftArrow from '_images/purpleArrowLeft.svg';
import emailSent from '_images/emailSent.svg';
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
  SignupFromSigninButton,
  SignupFromSigninText,
  ErrorMessage,
  SuccessMessage,
  ResetPasswordText,
  BackToSignInText,
  EmailSentImage,
  ExtraTextBlock,
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
  const handleModalSwitch = (loginType) => {
    dispatch(setLoginType(loginType));
  };

  const formContent = {
    fields: [],
    statusIndicator: null,
    button: {},
    initialValues: {},
    validationSchema: {},
    signupFromSigninButton: false,
    findTicketsText: false,
  };
  const generateFormContent = () => {
    switch (loginType) {
      case 'Sign Up':
        formContent.fields = [
          {
            id: 'fullName',
            type: 'text',
            height: 'auto',
            placeholder: 'Full Name',
            component: InputField,
          },
          {
            id: 'email',
            type: 'text',
            height: 'auto',
            placeholder: 'Email',
            component: InputField,
          },
          {
            id: 'phone',
            type: 'text',
            height: 'auto',
            placeholder: 'Phone',
            component: InputField,
          },
          {
            id: 'password',
            type: passwordInputType,
            height: '50px',
            placeholder: 'Password',
            component: PasswordInputField,
          },
        ];
        formContent.statusIndicator =
          loginMessage && loginMessage.includes('Successful') ? (
            <SuccessMessage>{loginMessage}</SuccessMessage>
          ) : (
            loginMessage && <ErrorMessage>{loginMessage}</ErrorMessage>
          );
        formContent.button = { buttonText: loading ? '...' : loginType };
        formContent.initialValues = {
          fullName: '',
          email: '',
          phone: '',
          password: '',
        };
        formContent.validationSchema = Yup.object().shape({
          fullName: Yup.string().required('Name is Required'),
          email: Yup.string()
            .email('Please enter correct email')
            .required('Email is Required.'),
          phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Phone number is Required'),
          password: Yup.string().required('Password is Required'),
        });

        break;

      case 'Sign In':
        formContent.fields = [
          {
            id: 'email',
            type: 'text',
            height: 'auto',
            placeholder: 'Email',
            component: InputField,
          },
          {
            id: 'password',
            type: passwordInputType,
            height: '50px',
            placeholder: 'Password',
            component: PasswordInputField,
          },
        ];
        formContent.statusIndicator =
          loginMessage && loginMessage.includes('Successful') ? (
            <SuccessMessage>{loginMessage}</SuccessMessage>
          ) : (
            loginMessage && <ErrorMessage>{loginMessage}</ErrorMessage>
          );
        formContent.button = { buttonText: loading ? '...' : loginType };
        formContent.initialValues = { email: '', password: '' };
        formContent.validationSchema = Yup.object().shape({
          email: Yup.string()
            .email('Please enter correct email.')
            .required('Email is Required.'),
          password: Yup.string().required('Password is Required.'),
        });
        formContent.forgotPasswordText = 'Forgot Password?';
        formContent.signupFromSigninButton = true;
        break;

      case 'Reset Password':
        formContent.fields = [
          {
            id: 'email',
            type: 'text',
            height: 'auto',
            placeholder: 'Email',
            component: InputField,
          },
        ];
        formContent.initialValues = {
          email: '',
        };
        formContent.validationSchema = Yup.object().shape({
          email: Yup.string()
            .email('Please enter correct email.')
            .required('Email is Required.'),
        });
        formContent.statusIndicator =
          loginMessage && loginMessage.includes('Successful') ? (
            <SuccessMessage>{loginMessage}</SuccessMessage>
          ) : (
            loginMessage && <ErrorMessage>{loginMessage}</ErrorMessage>
          );
        formContent.button = {
          buttonText: 'Send Reset Instructions',
          position: isMobileDevice && 'bottom',
        };
        break;

      case 'Reset Instructions Sent':
        formContent.statusIndicator = (
          <>
            <EmailSentImage src={emailSent} />
            <ResetPasswordText>
              Reset instructions have been sent.
            </ResetPasswordText>
          </>
        );
        formContent.button = {
          buttonText: 'Sign In',
          position: isMobileDevice && 'bottom',
        };
        break;

      case 'Find Ticket':
        formContent.fields = [
          {
            id: 'email',
            type: 'text',
            height: 'auto',
            placeholder: 'Email',
            component: InputField,
          },
          {
            id: 'phone',
            type: 'text',
            height: 'auto',
            placeholder: 'Phone',
            component: InputField,
          },
          {
            id: 'orderId',
            type: 'text',
            height: 'auto',
            placeholder: 'Order Id',
            component: InputField,
          },
        ];
        formContent.initialValues = { email: '', phone: '', orderId: '' };
        formContent.validationSchema = Yup.object().shape({
          phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Phone Number is Required.'),
          email: Yup.string()
            .email('Please enter correct email.')
            .required('Email is Required.'),
          orderId: Yup.string().required('Order ID is Required.'),
        });
        formContent.statusIndicator = <div>{loginMessage}</div>;
        formContent.button = {
          buttonText: 'Find My Tickets',
          // position: isMobileDevice && 'bottom',
        };
        formContent.findTicketsText = true;
        break;

      default:
        break;
    }
  };

  generateFormContent();

  return (
    <StyledModal>
      <Header>
        <CloseButton
          src={isMobileDevice ? leftArrow : closeModalButton}
          onClick={closeModal}
        />
        {isMobileDevice && <div>Back</div>}
      </Header>
      <Title loginType={loginType}>
        {loginType === 'Reset Instructions Sent'
          ? 'Reset Password'
          : loginType === 'Find Ticket'
          ? "Let's Find Your Tickets"
          : loginType}
        {/* loginTitle? */}
      </Title>
      {loginType === 'Reset Password' && !isMobileDevice && (
        <ResetPasswordText>
          Enter the email address you used when signing up for SelectSeats to
          reset your password.
          <BackToSignInText onClick={() => handleModalSwitch('Sign In')}>
            Back to Sign in
          </BackToSignInText>
        </ResetPasswordText>
      )}
      {/* <Title>{loginTitle}</Title> */}
      <StyledForm
        initialValues={formContent.initialValues}
        handleSubmit={handleSubmit}
        validationSchema={formContent.validationSchema}
      >
        {(props) => (
          <div>
            {formContent.statusIndicator}
            {formContent.fields?.map((field) => (
              // {(loginType === 'Sign Up' || loginType === 'Find Ticket') && (
              <Field
                key={field.id}
                id={field.id}
                type={field.type}
                width={isMobileDevice ? '100%' : '380px'}
                height={field.height}
                placeholder={field.placeholder}
                component={field.component}
                {...props}
              />
            ))}
            {formContent.forgotPasswordText && (
              <ForgotPasswordText
                onClick={() => handleModalSwitch('Reset Password')}
              >
                {formContent.forgotPasswordText}
              </ForgotPasswordText>
            )}
            {
              <Button
                type="submit"
                position={
                  formContent.button.position && formContent.button.position
                }
              >
                {formContent?.button?.buttonText}
              </Button>
            }
            {formContent.signupFromSigninButton && isMobileDevice ? (
              <SignupFromSigninButton
                onClick={() => handleModalSwitch('Sign Up')}
              >
                Sign Up
              </SignupFromSigninButton>
            ) : (
              formContent.signupFromSigninButton &&
              !isMobileDevice && (
                <NoAccountText>
                  Need a SelectSeats account?
                  <SignupFromSigninText
                    onClick={() => handleModalSwitch('Sign Up')}
                  >
                    Sign up here
                  </SignupFromSigninText>
                </NoAccountText>
              )
            )}

            {formContent.findTicketsText && (
              <>
                <ExtraTextBlock>
                  <hr></hr>
                  <span>Or</span>
                  <hr></hr>
                </ExtraTextBlock>
                <Button onClick={() => handleModalSwitch('Sign In')}>
                  Sign In
                </Button>
              </>
            )}
          </div>
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
