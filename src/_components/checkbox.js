import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '_constants';
import { Icon, Flex } from '_components';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  visibility: hidden;
  display: block;
  width: 0;
  height: 0;
`;

const StyledIcon = styled((props) => <Icon {...props} />)`
  visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
`;

const StyledCheckbox = styled((props) => <Flex {...props} />)`
  width: 20px;
  height: 20px;
  padding: 4px 3px;
  background: ${(props) => (props.checked ? colors.brand : colors.mLightGray)};
  border: 1px solid
    ${(props) => (props.checked ? colors.brand : colors.lightGray)};
  border-radius: 4px;
  cursor: pointer;
`;

const CheckboxLabel = styled.span`
  margin-left: 12px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

export const Checkbox = ({ label, checked, handleChange, className }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} onChange={handleChange} name={label} />
    <StyledCheckbox checked={checked}>
      <StyledIcon
        checked={checked}
        size={12}
        name="check"
        color={colors.white}
        viewBox="0 0 12 10"
      />
    </StyledCheckbox>
    <CheckboxLabel>{label}</CheckboxLabel>
  </CheckboxContainer>
);

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  className: PropTypes.any,
};
