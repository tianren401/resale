import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;

export const Form = ({ initialValues, handleSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => <StyledForm onSubmit={props.handleSubmit}>{children(props)}</StyledForm>}
    </Formik>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  validationSchema: PropTypes.object,
  children: PropTypes.any,
};