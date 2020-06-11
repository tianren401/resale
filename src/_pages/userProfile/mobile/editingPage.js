import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import {
  Icon,
  InputField,
  Loader,
  PasswordInputField,
  PrimaryButton,
  TextButton,
} from '_components';
import { colors, navigationHeight } from '_constants';
import { updateUserPassword, updateUserInfo } from '_store/userProfile';
import { setUser, passwordVerify } from '_store/auth';
import { authService } from '_services';
import { phoneRegExp } from '_helpers';

const StyledBackground = styled.div`
  width: 100%;
  height: calc(100vh - ${navigationHeight}px);
  padding: 0 20px 100px;
  position: relative;
`;

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding-top: 80px;
  height: 100%;
`;

const BackButton = styled(TextButton)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  position: absolute;
  left: 14px;
  top: 18px;
`;

const StyledInputField = styled(InputField).attrs({
  width: '100%',
  height: '68px',
})``;

const StyledPasswordInputField = styled(PasswordInputField).attrs({
  width: '100%',
  height: '73px',
})``;

const Line = styled.div`
  width: 80%;
  margin: auto;
  border: 1px solid ${colors.lightGray};
  margin-bottom: 24px;
`;

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const EditingPage = () => {
  const history = useHistory();
  const location = useLocation();
  const target = location.state.target;
  const dispatch = useDispatch();
  const { passwordInputType } = useSelector((state) => state.uiReducer);
  const user = authService.getAuthFromStorage()?.user;
  const { loading } = useSelector((state) => state.userProfileReducer);

  const updatePassword = (body) => {
    dispatch(
      updateUserPassword({
        body,
        success: () => {
          history.push('/user/mobile');
        },
      })
    );
  };

  const handleSubmit = (values) => {
    if (target === 'password') {
      dispatch(
        passwordVerify({
          body: {
            username: user.email,
            password: values.oldPassword,
          },
          success: () => {
            updatePassword({
              email: user.email,
              newPassword: values.newPassword,
              oldPassword: values.oldPassword,
            });
          },
        })
      );
    } else {
      const body = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: values.phone,
      };
      dispatch(
        updateUserInfo({
          body,
          success: (body) => {
            dispatch(setUser(body));
            history.push('/user/mobile');
          },
        })
      );
    }
  };

  const handleBack = () => {
    history.push('/user/mobile');
  };

  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password cannot be blank.'),
    newPassword: Yup.string().required('New password cannot be blank.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match.')
      .required('Confirm password cannot be blank.'),
  });
  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number cannot be blank'),
  });

  const initialValues = {
    password: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    phone: {
      phone: user.phone || '',
    },
    email: {
      email: user.email || '',
    },
  };

  if (loading) return <Loader centered />;

  return (
    <StyledBackground>
      <BackButton onClick={handleBack}>
        <Icon name="leftArrow" size={24} color={colors.brand} />
        Back
      </BackButton>
      <Container>
        <Formik
          initialValues={initialValues[target]}
          validationSchema={
            target === 'phone' ? phoneSchema : passwordValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {(props) => (
            <StyledForm onSubmit={props.handleSubmit}>
              {target === 'password' && (
                <div>
                  <Field
                    id="oldPassword"
                    placeholder="Enter old password"
                    type="password"
                    component={StyledInputField}
                    {...props}
                  />
                  <Line />
                  <Field
                    id="newPassword"
                    placeholder="Enter new password"
                    type="password"
                    component={StyledInputField}
                    {...props}
                  />
                  <Field
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    type={passwordInputType}
                    component={StyledPasswordInputField}
                    {...props}
                  />
                </div>
              )}
              {target === 'phone' && (
                <div>
                  <Field
                    id="phone"
                    label="Phone Number"
                    type="text"
                    component={StyledInputField}
                    {...props}
                  />
                </div>
              )}
              {target === 'email' && (
                <div>
                  <Field
                    id="email"
                    label="Email"
                    type="text"
                    component={StyledInputField}
                    {...props}
                  />
                </div>
              )}
              <PrimaryButton
                minWidth="100%"
                fontSize="14px"
                buttonSize="large"
                type="submit"
              >
                Save Changes
              </PrimaryButton>
            </StyledForm>
          )}
        </Formik>
      </Container>
    </StyledBackground>
  );
};

EditingPage.propTypes = {
  handleSubmit: PropTypes.func,
};
