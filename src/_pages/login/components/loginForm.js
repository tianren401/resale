import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';

import { InputField, Form } from '_components';

const Button = styled.button`
  width: 100%;
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
              width="380px"
              placeholder="Email"
              component={InputField}
              {...props}
            />
            <Field
              id="password"
              type="password"
              width="380px"
              placeholder="Password"
              component={InputField}
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
