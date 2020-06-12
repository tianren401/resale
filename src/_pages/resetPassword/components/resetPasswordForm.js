import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Field } from 'formik';
import * as Yup from 'yup';

import { Form, PasswordInputField } from '_components';
import { colors } from '_constants';
import { isMobileDevice } from '_helpers';

const Container = styled.div`
  max-width: 400px;
  margin: 0;
  position: absolute;
  top: ${isMobileDevice ? '25%' : '50%'};
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.div`
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  padding: 12px;
`;

const Detail = styled.div`
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  padding: 12px;
  margin-bottom: 12px;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 380px;
  padding: 20px 32px 18px 32px;
  background-color: ${colors.brand};
  border-radius: 6px;
  border: none;
  font-size: 16px;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  ${isMobileDevice &&
  `
  position: fixed;
  top: 80vh;
  `}
`;

const StyledForm = styled(Form)`
  justify-content: center;
`;

const ResetPasswordForm = () => {
  const uiReducer = (state) => state.uiReducer;
  const { passwordInputType } = useSelector(uiReducer);
  return (
    <Container>
      <Heading>Reset Password</Heading>
      <Detail>Reset your SelectSeats account password</Detail>

      <StyledForm
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          password: Yup.string().required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password must be confirmed'),
        })}
      >
        {(props) => (
          <>
            <Field
              id="password"
              type={passwordInputType}
              width="380px"
              height={isMobileDevice ? '80px' : '70px'}
              placeholder="Enter new password"
              component={PasswordInputField}
              {...props}
            />

            <Field
              id="confirmPassword"
              type={passwordInputType}
              width="380px"
              height="70px"
              placeholder="Re-enter password"
              component={PasswordInputField}
              {...props}
            />

            <Button type="submit">Reset Password</Button>
          </>
        )}
      </StyledForm>
    </Container>
  );
};

export default ResetPasswordForm;
