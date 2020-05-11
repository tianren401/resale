import styled from 'styled-components';

import { shadows, colors } from '_constants';

export const Button = styled.button`
  border: none;
  min-width: ${(props) => props.minWidth || '100px'};
  padding: 1rem 2rem;
  text-align: ${(props) => props.textAlign || 'center'};
  border-radius: 6px;
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  cursor: pointer;
  transition-duration: 0.3s;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  transition: opacity 100ms ease-out;
  color: ${colors.white};
  background-color: ${colors.brand};

  &:disabled {
    color: ${colors.gray};
    background-color: ${colors.lightGray};
    opacity: 0.5;
  }

  &:active {
    background-color: ${colors.brandHover};
    box-shadow: ${shadows.small};
  }

  &:hover:not(:disabled) {
    background-color: ${colors.brandHover};
  }
`;

export const TextButton = styled(Button)`
  color: ${(props) => props.color || colors.black}
  background-color: inherit;

  &:disabled {
    color: ${colors.lightGray};
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    color: ${colors.brand};
  }
`;
