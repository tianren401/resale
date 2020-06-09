import styled from 'styled-components';

import { shadows, colors } from '_constants';

const size = {
  large: '18px 32px',
  medium: '14px 24px',
  small: '8px 16px',
};

export const Button = styled.button`
  border: none;
  min-width: ${(props) => props.minWidth || '10px'};
  padding: ${(props) =>
    props.buttonSize ? size[`${props.buttonSize}`] : size.medium};
  text-align: ${(props) => props.textAlign || 'center'};
  border-radius: 6px;
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '500'};
  line-height: 20px;
  cursor: pointer;
  transition-duration: 0.3s;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  transition: opacity 100ms ease-out;
  color: ${colors.white};
  background: ${colors.brand};

  &:disabled {
    color: ${colors.gray};
    background: ${colors.lightGray};
    opacity: 0.5;
  }

  &:active {
    background: ${colors.brandHover};
    box-shadow: ${shadows.small};
  }

  &:hover:not(:disabled) {
    background: ${colors.brandHover};
  }
`;

export const SuccessButton = styled(Button)`
  transition: opacity 100ms ease-out;
  color: ${colors.white};
  background: ${colors.success};

  &:disabled {
    color: ${colors.gray};
    background: ${colors.lightGray};
    opacity: 0.5;
  }

  &:active {
    background: ${colors.successHover};
    box-shadow: ${shadows.small};
  }

  &:hover:not(:disabled) {
    background: ${colors.successHover};
  }
`;

export const DangerButton = styled(Button)`
  transition: opacity 100ms ease-out;
  color: ${colors.white};
  background: ${colors.danger};

  &:disabled {
    color: ${colors.gray};
    background: ${colors.lightGray};
    opacity: 0.5;
  }

  &:active {
    background: ${colors.dangerHover};
    box-shadow: ${shadows.small};
  }

  &:hover:not(:disabled) {
    background: ${colors.dangerHover};
  }
`;

export const SecondaryButton = styled(Button)`
  color: ${colors.brand};
  background: ${colors.lightBrand};

  &:disabled {
    color: ${colors.gray};
    background: ${colors.lightGray};
    opacity: 0.5;
  }

  &:active {
    background: ${colors.lightBrandHover};
    box-shadow: ${shadows.small};
  }

  &:hover:not(:disabled) {
    background: ${colors.lightBrandHover};
  }
`;

export const TextButton = styled(Button)`
  background: ${(props) => props.color || `${colors.brand}`};
  line-height: ${(props) => props.lineHight || '20px'};
  padding: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:disabled {
    background: ${colors.lightGray};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background: ${(props) => props.hoverColor || `${colors.brandHover}`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
