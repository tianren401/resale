import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deviceSize } from '_constants';

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: ${deviceSize.mobileL}px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Form = ({
  initialValues,
  handleSubmit,
  validationSchema,
  children,
  className,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <StyledForm onSubmit={props.handleSubmit} className={className}>
          {children(props)}
        </StyledForm>
      )}
    </Formik>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  validationSchema: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.any,
};
