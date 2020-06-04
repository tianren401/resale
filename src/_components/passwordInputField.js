import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setPasswordInputType } from '_store/ui';
import showPassword from '_images/showPassword.svg';
import hidePassword from '_images/hidePassword.svg';
import { colors } from '_constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '280px')};
  height: ${(props) => (props.height ? props.height : '92px')};
`;

const Label = styled.div`
  font-size: ${(props) => (props.labelSize ? props.labelSize : '12px')};
  margin-bottom: 8px;
  text-align: left;
  line-height: 16px;
  color: ${colors.darkGray};
`;

const Input = styled.input`
  width: 100%;
  border-radius: 6px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
  line-height: 22px;
  outline: none;
  border: 1px solid
    ${(props) =>
      props.touched && props.error
        ? `${colors.danger}`
        : `${colors.lightGray}`};
  padding: 13px 16px;
  background: ${(props) =>
    props.touched && props.error ? `${colors.white}` : `${colors.mLightGray}`};
  color: ${colors.black};

  &:focus {
    background: ${colors.white};
    border: 1px solid ${colors.brand};
  }
`;

const Error = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 4px;
  color: ${colors.danger};
  text-align: left;
`;

const PasswordInputContainer = styled.div`
  width: 100%;
`;

const ShowPasswordImage = styled.img`
  position: relative;
  left: 150px;
  bottom: 35px;
  cursor: pointer;
`;

export const PasswordInputField = ({
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
  fontSize,
  labelSize,
  width,
  height,
}) => {
  const uiReducer = (state) => state.uiReducer;
  const { passwordInputType } = useSelector(uiReducer);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setPasswordInputType());
  };
  return (
    <div>
      {!!label && <Label fontSize={labelSize}>{label}</Label>}
      <Container width={width} height={height}>
        <PasswordInputContainer>
          <Input
            id={id}
            {...input}
            fontSize={fontSize}
            placeholder={placeholder}
            value={values[id]}
            type={type}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched[id]}
            error={!!errors[id]}
          />
          <ShowPasswordImage
            src={passwordInputType === 'password' ? showPassword : hidePassword}
            onClick={handleClick}
          />
        </PasswordInputContainer>
        <Error>{touched[id] && !!errors[id] && errors[id]}</Error>
      </Container>
    </div>
  );
};

PasswordInputField.propTypes = {
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
  fontSize: PropTypes.string,
  labelSize: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
