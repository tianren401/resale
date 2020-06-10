import styled from 'styled-components';

import { Dropdown, Button } from '_components';
import { colors, shadows, deviceSize } from '_constants';

export const StyledFilterOptions = styled.form`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: calc(100% - 320px);
  height: 70px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  z-index: 3;

  @media (max-width: ${deviceSize.mobileL}px) {
    order: 1;
    min-height: 60px;
    width: 100%;
    border-radius: 12px 12px 0 0;
    box-shadow: 0px -10px 20px 0px rgba(0, 0, 0, 0.15);
    z-index: 3;
  }
`;

export const ListDropdown = styled(Dropdown)`
  display: flex;
  margin: 15px 20px;
`;

export const StyledRangeSliderDropdown = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  padding: 12px;
  margin: 15px;
  width: 125px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  color: ${colors.black};
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  border: 1px solid ${colors.lightGray};
  box-sizing: border-box;
  border-radius: 6px;

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
`;

export const RangeSliderDropdownContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  border-radius: 6px;
`;

export const StyledMobileFilterOptions = styled.div`
  background-color: white;
  position: fixed;
  top: 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 0%;
  padding: 0 20px;
  border: 1px solid #f0f0f5;
  overflow: hidden;
  transition: 0.2s;
  overflow: hidden;

  @media (min-width: ${deviceSize.tablet}px) {
    width: calc(100% - 320px);
  }

  ${({ mobileFiltersOpen }) =>
    mobileFiltersOpen &&
    `
    height: 100%;
    `};
`;

export const MobileFilterButton = styled.img`
  display: flex;
  width: 18px;
  min-height: 20px;
  margin: 20px;
`;

export const MobileFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10px 0;
`;

export const MobileFilterTitle = styled.p`
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  height: 20px;
  margin: 0px;
`;

export const PriceSortButton = styled(Button)`
  transition: opacity 100ms ease-out;
  color: ${colors.brand};
  background: ${colors.white};
  border: 1px solid ${colors.brand};
  width: 135px;
  height: 48px;
  margin: 15px;

  &.active {
    background: ${colors.brand};
    color: ${colors.white};
    box-shadow: ${shadows.small};
  }

  &:hover:not(:disabled) {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(130, 136, 148, 0.16);
  }
`;

export const CloseMobileFilterOptions = styled(Button)`
  align-self: flex-end;
  color: #babbc2;
  background-color: ${colors.white};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding: 15px;
`;
