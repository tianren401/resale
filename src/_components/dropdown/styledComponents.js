import styled from 'styled-components';

import {
  DropdownExpandIcon,
  DropdownCollapseIcon,
} from '_components/icon/svgIcons';

import { colors, deviceSize } from '_constants';

export const StyledDropdown = styled.div`
  background-color: white;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  user-select: none;
  width: ${(props) => (props.width ? props.width : '179px')};
  color: ${colors.black};
  min-width: 179px;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  border: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  border-radius: 6px;
  max-height: 48px;
  
  &:hover {
    border-color: ${colors.brand};
    color: ${colors.brand};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(130, 136, 148, 0.16);
  }

  &:focus{
    box-shadow: none;
    border-color: ${colors.brand};
    color: ${colors.brand};
    background: linear-gradient(0deg, rgba(103, 38, 241, 0.16), rgba(103, 38, 241, 0.16)), #FFFFFF;
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

  @media (max-width: ${deviceSize.tablet}px) {
    width: 100%;
    min-width: auto;
  }
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

export const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.black};

  ${({ hasChildren }) =>
    hasChildren &&
    `
    position: relative;
    `}

  &:hover {
    .DayPicker {
      color: ${colors.black};
    }

    color: ${colors.brand};
    background: linear-gradient(
        0deg,
        rgba(103, 38, 241, 0.16),
        rgba(103, 38, 241, 0.16)
      ),
      #ffffff;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    border-bottom: 1px solid ${colors.lightGray};
  }
`;

export const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};
`;

export const Header = styled.div`
  display: flex;
  color: ${colors.brand};
  justify-content: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e6e6eb;
`;

export const Text = styled.div`
  margin: 0 auto;
`;

export const CloseButton = styled.div``;
