import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Dropdown } from '_components/dropdown';
import { navigationHeight, deviceSize, colors } from '_constants';

export const StyledNavigation = styled.div`
  width: 100%;
  z-index: 2;
  background: ${({ page }) =>
    (page === 'user' || page === 'checkout') &&
    'linear-gradient(144.92deg, #455fe5 -14.65%, #9545e5 79.56%)'};

  display: ${({ hidden }) => (hidden ? 'none;' : 'flex;')}
    ${({ page }) =>
      page === 'event'
        ? `
  height: ${navigationHeight}px;
  flex-direction: row;
  justify-content: space-around;
  background: linear-gradient(144.92deg, #455fe5 -14.65%, #9545e5 79.56%);`
        : `
  justify-content: space-between;
  height: ${navigationHeight}px;
  padding: 8px 0;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  @media (min-width: ${deviceSize.tablet}px) {
    padding: 20px 0;
  }
  `};
`;

export const GridContent = styled.div`
  width: ${({ page }) => (page === 'event' ? '100%' : '1220px')};
  margin: 0 auto;
  display: flex;
`;

export const Logo = styled(Link)`
  display: flex;
  justify-content: flex-start;
  margin-left: ${({ page }) => (page === 'event' ? '35px' : '10px')};
  align-items: center;
  color: white;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
  flex: 1;

  color: ${colors.white};

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-right: 10px;
  flex: 1;
  justify-content: flex-end;
`;

export const UserItems = styled(Link)`
  cursor: pointer;
  display: none;
  color: ${colors.white};
  margin-right: 10px;
  padding: 5px;
  border-radius: 6px;
  background-color: ${({ tab }) =>
    tab === 'myTickets' && colors.lightBrandHover};
  color: white;

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ tab }) => tab !== 'noHover' && 'transparent'};
  }

  @media (min-width: ${deviceSize.tablet}px) {
    display: inline-block;
  }
`;

export const ModalItems = styled.span`
  cursor: pointer;
  display: none;
  color: ${colors.white};
  padding: 5px;
  border-radius: 6px;

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:not(:last-of-type) {
    margin-right: 10px;
  }

  background: ${({ tab }) => tab === 'signUp' && colors.brandHover};

  color: white;

  @media (min-width: ${deviceSize.tablet}px) {
    display: inline-block;
  }
`;

export const UserItemsMobile = styled.span`
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 42px;
  display: inline-block;
  vertical-align: center;

  &:not(:last-of-type) {
    margin-right: 10px;
    padding: 10px;
  }

  color: white;

  &:hover {
    background: ${colors.brandHover};
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ tab }) => tab !== 'noHover' && 'transparent'};
  }

  &:hover,
  &:focus {
    background-color: ${colors.lightBrandHover};
  }

  @media (min-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  background-color: transparent;
  color: white;
  border: none;
  justify-content: normal;
  padding: 0px;
  width: auto;
  min-width: 5px;
  max-width: 180px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.brand};
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const EventInfo = styled.div`
  height: ${navigationHeight}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Event = styled.div`
  font-weight: bold;
  color: white;
`;

export const Subtitle = styled.div`
  display: flex;
  color: #f0f0f5;
`;
