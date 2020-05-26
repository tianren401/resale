import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import paths from './icons.data';

const StyledIcon = styled.svg`
  display: inline-block;
  vertical-align: middle;

  ${({ onClick }) =>
    onClick &&
    `
    cursor: pointer;
  `}

  path {
    fill: ${(props) => props.color};
  }
`;

export const Icon = ({ onClick, className, name, size, color, viewBox }) => {
  return (
    <StyledIcon
      onClick={onClick}
      className={className}
      color={color}
      width={`${size}px`}
      height={`${size}px`}
      viewBox={viewBox || '0 0 24 24'}
    >
      {paths[name] && <path d={paths[name]} />}
    </StyledIcon>
  );
};

Icon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  viewBox: PropTypes.string,
};
