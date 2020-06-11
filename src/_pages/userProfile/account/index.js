import React, { useState } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import {
  Form,
  InputField,
  PrimaryButton,
  TextButton,
  H4,
  H6,
  Loader,
} from '_components';
import { colors } from '_constants';
import { phoneRegExp } from '_helpers';
import { updateUserInfo } from '_store/userProfile';
import { setUser } from '_store/auth';
import { PasswordModal } from '../components';

const StyledAccount = styled.div`
  background: ${colors.white};
  min-height: 470px;
  border: 2px solid rgba(103, 38, 241, 0.16);
  border-radius: 8px;
  padding: 40px;
  position: relative;
`;

const Title = styled(H4)`
  margin-bottom: 40px;
`;

const StyledInputField = styled(InputField).attrs({ height: '63px' })``;

const PasswordDiv = styled.div`
  width: 100%;
  text-align: left;

  > h6 {
    margin-bottom: 20px;
  }
`;

const SubmitDiv = styled.div`
  width: 100%;
  margin-top: 37px;
  display: flex;
  justify-content: flex-end;
`;

export const Account = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleModalOpen = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const { user } = useSelector((state) => state.authReducer);
  const { loading } = useSelector((state) => state.userProfileReducer);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    firstName: Yup.string().required('First name cannot be blank'),
    lastName: Yup.string().required('Last name cannot be blank'),
    email: Yup.string()
      .email('Please enter correct email')
      .required('Email cannot be blank.'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number cannot be blank'),
  });

  const handleSubmit = (values) => {
    dispatch(
      updateUserInfo({
        body: values,
        success: (body) => {
          dispatch(setUser(body));
        },
      })
    );
  };

  if (loading || !user)
    return (
      <StyledAccount>
        <Loader centered />
      </StyledAccount>
    );

  return (
    <StyledAccount>
      <Title>Account Settings</Title>
      <Form
        initialValues={{
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
        }}
        handleSubmit={handleSubmit}
        validationSchema={schema}
      >
        {(props) => (
          <>
            <Field
              id="firstName"
              label="First Name"
              type="text"
              component={StyledInputField}
              {...props}
            />
            <Field
              id="lastName"
              label="Last Name"
              type="text"
              component={StyledInputField}
              {...props}
            />
            <Field
              id="email"
              label="Email"
              type="text"
              component={StyledInputField}
              input={{ disabled: true }}
              {...props}
            />
            <Field
              id="phone"
              label="Phone Number"
              type="text"
              component={StyledInputField}
              {...props}
            />
            <PasswordDiv>
              <H6 color={colors.darkGray}>Password</H6>
              <TextButton type="button" onClick={handleModalOpen}>
                Change my password
              </TextButton>
            </PasswordDiv>
            <SubmitDiv>
              <PrimaryButton minWidth="160px" fontSize="14px" type="submit">
                Update
              </PrimaryButton>
            </SubmitDiv>
          </>
        )}
      </Form>
      <PasswordModal isOpenModal={isOpenModal} closeModal={closeModal} />
    </StyledAccount>
  );
};
