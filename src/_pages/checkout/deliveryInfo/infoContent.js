import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import {
  H2,
  ContentImage,
  Form,
  InputField,
  PrimaryButton,
  TextButton,
  Loader,
} from '_components';
import { colors } from '_constants';
import ticketProtectIcon from '_images/ticketProtectIcon.svg';
import { LoginModal } from '_pages';

const Container = styled.div`
  width: 60%;
  max-width: 580px;
  position: relative;
`;

const ProtectionGroup = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-top: 14px;
  margin-bottom: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > span {
    vertical-align: middle;
    margin-left: 8px;
  }

  & > img {
    background: ${colors.lightSuccess};
    padding: 6px;
    border-radius: 50%;
  }
`;

const Login = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  width: ${(props) => (props.width ? props.width : '280px')};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 0;
`;

const LoginLink = styled(TextButton)`
  padding: 0;
  padding-left: 5px;
`;

export const InfoContent = ({ handleSubmit }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { loading } = useSelector((state) => state.checkoutReducer);

  const handleModalOpen = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter correct email.')
      .required('Email cannot be blank.'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number cannot be blank.'),
  });

  if (loading)
    return (
      <Container>
        <Loader centered />
      </Container>
    );

  return (
    <Container>
      <H2 weight="500">Delivery Information</H2>
      <ProtectionGroup>
        <ContentImage src={ticketProtectIcon} />
        <span>Ticket Protection Guaranteed</span>
      </ProtectionGroup>
      <Form
        initialValues={{
          email: '',
          phoneNumber: '',
        }}
        handleSubmit={handleSubmit}
        validationSchema={schema}
      >
        {(props) => (
          <>
            <Field
              id="email"
              label="Email"
              type="text"
              placeholder="me@example.com"
              component={InputField}
              {...props}
            />
            <Field
              id="phoneNumber"
              label="Phone Number"
              type="text"
              placeholder="(555) 555-5555"
              component={InputField}
              {...props}
            />
            <Login>
              <span>Already have an account?</span>
              <LoginLink type="button" onClick={handleModalOpen}>
                Log in here
              </LoginLink>
            </Login>
            <PrimaryButton
              minWidth="280px"
              fontSize="14px"
              buttonSize="large"
              type="submit"
            >
              Continue as Guest
            </PrimaryButton>
          </>
        )}
      </Form>
      <LoginModal isOpenModal={isOpenModal} closeModal={closeModal} />
    </Container>
  );
};

InfoContent.propTypes = {
  handleSubmit: PropTypes.func,
};
