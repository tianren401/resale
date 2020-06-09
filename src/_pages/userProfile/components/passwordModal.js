import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import {
  Form,
  H3,
  InputField,
  Loader,
  PasswordInputField,
  PrimaryButton,
} from '_components';
import { colors, shadows } from '_constants';
import { useModal } from '_hooks';
import closeModalButton from '_images/closeModal.svg';
import { updateUserPassword } from '_store/userProfile';

const modelStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '456px',
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
`;

const StyledInputField = styled(InputField).attrs({
  width: '380px',
  height: '68px',
})``;

const StyledPasswordInputField = styled(PasswordInputField).attrs({
  width: '380px',
  height: '73px',
})``;

const SubmitDiv = styled.div`
  width: 100%;
  margin-top: 37px;
  display: flex;
  justify-content: flex-end;
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

const Line = styled.div`
  width: 250px;
  margin: auto;
  border: 1px solid ${colors.lightGray};
  margin-bottom: 24px;
`;
export const PasswordModal = () => {
  const dispatch = useDispatch();
  const { Modal, isOpenModal, closeModal } = useModal();
  const { passwordInputType } = useSelector((state) => state.uiReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { loading } = useSelector((state) => state.userProfileReducer);

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password cannot be blank.'),
    newPassword: Yup.string().required('New password cannot be blank.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match.')
      .required('Confirm password cannot be blank.'),
  });

  const handleSubmit = (values) => {
    dispatch(
      updateUserPassword({
        body: {
          email: user.email,
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        },
        success: () => {
          closeModal();
        },
      })
    );
  };

  if (loading)
    return (
      <Modal>
        <Loader centered />
      </Modal>
    );

  return (
    <Modal
      isOpen={isOpenModal}
      closeModal={closeModal}
      customStyles={modelStyles}
    >
      <Header>
        <CloseButton src={closeModalButton} onClick={closeModal} />
      </Header>
      <Title>Change my password</Title>
      <Form
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        handleSubmit={handleSubmit}
        validationSchema={schema}
      >
        {(props) => (
          <>
            <Field
              id="oldPassword"
              label="Enter old password"
              type="password"
              component={StyledInputField}
              {...props}
            />
            <Line />
            <Field
              id="newPassword"
              label="Enter new password"
              type="password"
              component={StyledInputField}
              {...props}
            />
            <Field
              id="confirmPassword"
              label="Confirm new password"
              type={passwordInputType}
              component={StyledPasswordInputField}
              {...props}
            />
            <SubmitDiv>
              <PrimaryButton
                minWidth="170px"
                fontSize="14px"
                buttonSize="large"
                type="submit"
              >
                Save Changes
              </PrimaryButton>
            </SubmitDiv>
          </>
        )}
      </Form>
    </Modal>
  );
};
