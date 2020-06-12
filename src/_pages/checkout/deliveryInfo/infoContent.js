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
  // TextButton,
  Loader,
} from '_components';
import { colors, deviceSize } from '_constants';
import ticketProtectIcon from '_images/ticketProtectIcon.svg';
import { CheckoutLoginModal } from '../components';
import { phoneRegExp } from '_helpers';

const Container = styled.div`
  width: 60%;
  max-width: 580px;
  position: relative;

  @media (max-width: ${deviceSize.tablet}px) {
    background: ${colors.white};
    width: 100%;
    max-width: 800px;
    padding: 24px 20px;
    padding-bottom: 170px;
  }
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

  @media (max-width: ${deviceSize.mobileL}px) {
    width: 280px;
    margin: 16px auto;
  }
`;

// const Login = styled.div`
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 20px;
//   width: ${(props) => (props.width ? props.width : '280px')};
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 18px 0;

//   @media (max-width: ${deviceSize.tablet}px) {
//     display: none;
//   }
// `;

// const LoginMobile = styled.div`
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 20px;
//   width: ${(props) => (props.width ? props.width : '280px')};
//   justify-content: space-around;
//   align-items: center;
//   padding: 18px 0;
//   display: none;

//   @media (max-width: ${deviceSize.tablet}px) {
//     display: flex;
//   }
// `;

// const LoginLink = styled(TextButton)`
//   padding: 0;
//   padding-left: 5px;
// `;

const Title = styled(H2)`
  font-weight: 500;

  @media (max-width: ${deviceSize.tablet}px) {
    font-size: 18px;
    line-height: 24px;
  }

  @media (max-width: ${deviceSize.mobileL}px) {
    width: 280px;
    margin: auto;
  }
`;

const StyledForm = styled(Form)`
  @media (max-width: ${deviceSize.tablet}px) {
    display: flex;
  }
`;

export const InfoContent = ({ handleSubmit }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { loading } = useSelector((state) => state.checkoutReducer);

  // const handleModalOpen = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

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
      <Title>Delivery Information</Title>
      <ProtectionGroup>
        <ContentImage src={ticketProtectIcon} />
        <span>Ticket Protection Guaranteed</span>
      </ProtectionGroup>
      <StyledForm
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
            {/* <Login>
              <span>Already have an account?</span>
              <LoginLink type="button" onClick={handleModalOpen}>
                Sign in here
              </LoginLink>
            </Login> */}
            <PrimaryButton
              minWidth="280px"
              fontSize="14px"
              buttonSize="large"
              type="submit"
            >
              Continue as Guest
            </PrimaryButton>
            {/* <LoginMobile>
              <span>Already have an account?</span>
              <LoginLink type="button" onClick={handleModalOpen}>
                Sign in here
              </LoginLink>
            </LoginMobile> */}
          </>
        )}
      </StyledForm>
      <CheckoutLoginModal isOpenModal={isOpenModal} closeModal={closeModal} />
    </Container>
  );
};

InfoContent.propTypes = {
  handleSubmit: PropTypes.func,
};
