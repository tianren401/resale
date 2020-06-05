import styled from 'styled-components';

import {
  DropdownExpandIcon,
  DropdownCollapseIcon,
} from '_components/icon/svgIcons';
import { Box } from '_components/styledTags';

import { colors, deviceSize } from '_constants';

export const StyledDropdown = styled.div`
  background-color: white;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  user-select: none;
  width: ${(props) => (props.width ? props.width : '300px')};
  min-width: 179px;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  border: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  border-radius: 6px;

  @media (max-width: ${deviceSize.tablet}px) {
    width: 100%;

    &.modal {
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-top: none;

      &:hover {
        box-shadow: none;
        border-color: ${colors.lightGray};
      }
    }
  }

  &:hover {
    border-color: ${colors.brand};
    color: ${colors.brand};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(130, 136, 148, 0.16);
  }

  &:focus {
    box-shadow: none;
    border-color: ${colors.brand};
    color: ${colors.brand};
    background: linear-gradient(
        0deg,
        rgba(103, 38, 241, 0.16),
        rgba(103, 38, 241, 0.16)
      ),
      #ffffff;
  }

  &.active {
    border-color: ${colors.brand};
    color: ${colors.brand};
    border-color: ${colors.brand};
  }

  ${({ plain }) =>
    plain &&
    `
    background: none;
    border: none;
    padding: 0;
  `}

  .ap-footer {
    display: none !important;
  }

  input.ap-input {
    border: none !important;
  }

  .ap-input-icon {
    &.ap-icon-clear {
      right: 0 !important;
    }

    &.ap-icon-pin {
      display: none !important;
    }
  }

  .ap-dropdown-menu {
    left: -36px !important;
    width: calc(100% + 48px) !important;
    margin-top: 13px;
  }

  .ap-suggestion {
    line-height: 48px;
    height: 48px;

    &:hover {
      color: ${colors.brand};
      background: linear-gradient(
          0deg,
          rgba(103, 38, 241, 0.16),
          rgba(103, 38, 241, 0.16)
        ),
        #ffffff;
    }
  }
`;

export const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const DropdownArrowDown = styled(DropdownExpandIcon)`
  margin-left: 15px;
`;

export const DropdownArrowUp = styled(DropdownCollapseIcon)`
  margin-left: 15px;
`;

export const StyledDropdownMenu = styled.div`
  background-color: white;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  margin-top: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  border-radius: 6px;

  ${({ auto }) =>
    auto &&
    `
    overflow-x: hidden;
    min-width: 200px;
    max-height: 250px;
    overflow-y: scroll;
    `};
`;

export const SearchInput = styled.input`
  border: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 1px;
  transition: width 0.3s;
  padding-left: 15px;
  padding-right: 15px;
  border-right: ${(props) =>
    props.hasNext ? `1px solid ${colors.darkGray}` : 'none'};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  height: 40px;
  color: ${colors.black};

  &:hover {
    color: ${colors.brand};
  }

  &:focus {
    color: ${colors.brand};
    width: 100%;
    outline: none;
  }

  &::placeholder {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.black};

    &:hover {
      color: ${colors.brand};
    }
  }

  @media (max-width: ${deviceSize.tablet}px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  color: #6726f1;
  justify-content: center;
  padding: 10px 12px;
  border-bottom: 1px solid #e6e6eb;
`;

export const Text = styled.div`
  margin: 0 auto;
`;

export const CloseButton = styled.div``;
