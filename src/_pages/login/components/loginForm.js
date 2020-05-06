import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';

import { InputText, Form } from '_components';

const Button = styled.button`
  width: 100px;
  padding: 8px 22px;
  background-color: #008affd4;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  color: white;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 20px;
`;

const LoginForm = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <Title>Sign In</Title>
      <Form
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
            <Field
              id="email"
              type="text"
              placeholder="Email"
              component={InputText}
              {...props}
            />
            <Field
              id="password"
              type="password"
              placeholder="Password"
              component={InputText}
              {...props}
            />
            <Button type="submit">Log In</Button>
          </>
        )}
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
