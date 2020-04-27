import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: 20px;
  text-align: left;
`;

const Input = styled.input`
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  border: 1px solid #aaa;
  padding: 10px 20px;
  margin-bottom: 3px;
`;

const Error = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 20px;
  color: #ff4901;
  height: 20px;
  text-align: left;
`;

export const InputText = ({
  id,
  label,
  input,
  placeholder,
  type,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}) => (
  <div>
    {!!label && <Label>{label}</Label>}
    <Container>
      <Input
        id={id}
        {...input}
        placeholder={placeholder}
        value={values[id]}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Error>{touched[id] && !!errors[id] && errors[id]}</Error>
    </Container>
  </div>
);

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.any,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};
