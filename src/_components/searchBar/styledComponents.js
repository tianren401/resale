import styled, { css } from 'styled-components';
import { colors } from '_constants';
import { deviceSize } from '_constants';
import { Flex } from '_components/flex';

const SearchCommonStyle = css`
  text-align: left;
  position: relative;
  margin: 0 auto;
  background: ${colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  @media (max-width: ${deviceSize.laptop}px) {
    width: calc(100% - 2rem);
    margin-left: 1rem;
    margin-right: 1rem;
  }

  @media (min-width: ${deviceSize.laptop}px) {
    width: 846px;
  }
`;

export const SearchContainer = styled.div`
  ${SearchCommonStyle};

  height: 60px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  border-radius: 10px;

  @media (max-width: ${deviceSize.laptop}px) {
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  }
`;

export const FiltersContainer = styled.div`
  ${SearchCommonStyle};
  margin-top: 32px;
  height: 60px;
  background: transparent;

  @media (max-width: ${deviceSize.tablet}px) {
    flex-direction: column;
    height: auto;

    > div {
      width: 100%;
      margin-top: 1rem;
    }
  }
`;

export const SearchInputContainer = styled(Flex)`
  padding-left: 1.5rem;
  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
  }
`;

export const IconContainer = styled.div`
  padding-left: 1.5rem;
  @media (max-width: ${deviceSize.tablet}px) {
    padding-left: 10px;
  }
`;

export const SearchInput = styled.input`
  border: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 1px;
  transition: width 0.3s;
  padding-left: 26px;
  padding-right: 26px;
  border-right: ${(props) =>
    props.hasNext ? `1px solid ${colors.darkGray}` : 'none'};
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 22px;
  color: ${colors.darkGray};

  &:focus {
    width: 100%;
    outline: none;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const dropdownPosition = css`
  position: absolute;
  left: -10px;
  top: 34px;
  padding-left: 0;
  z-index: 1;
  padding: 20px 20px 0 20px;
`;

export const AutocompleteList = styled.ul`
  display: block;
  list-style: none;
  
  transition: width 0.3s;
  background-color: ${colors.white};
  margin: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(130, 136, 148, 0.16);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 3px solid rgba(103, 38, 241, 0.16);
  ${dropdownPosition}

  @media (max-width: ${deviceSize.tablet}px) {
    max-width: 100vh;
    width: calc(100% + 20px);
  }

  @media (min-width: ${deviceSize.tablet}px) {
    width: calc(100% + 20px);
    min-width: 30rem;
  }
`;

export const AutocompleteItem = styled.li`
  display: block;
  background: white;
  font-size: 1.2rem;
  width: 100%;
  border-radius: 2px;

  &:hover {
    background: rgba(103, 38, 241, 0.16);
    border-radius: 6px;
    font-weight: bold;
    color: #00b4cc;
    cursor: pointer;
    transition: 0.3s all;
  }

  &.active {
    background: whitesmoke;
    font-size: 1.5rem;
    color: #00b4cc;
  }
`;

export const EmptyListContainer = styled.div`
  color: ${colors.black};
  background-color: ${colors.white};
  margin-bottom: 10px;
`;

export const SectionHeader = styled(Flex)`
  h1 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${colors.brand};
    text-transform: capitalize;
  }
`;

export const SectionContainer = styled(Flex)`
  border: ${(props) => (props.border ? `1px solid ${colors.black}` : 'none')};
  padding: 10px;
  height: 80px;
  h2 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${colors.black};
    margin: 0;
  }

  h3 {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.darkGray};
    margin: 0;

    &.brand-color {
      color: ${colors.brand};
    }
  }

  &:hover {
    h2 {
      color: ${colors.brand};
    }

    h3 {
      color: ${colors.black};

      &.brand-color {
        color: ${colors.brand};
      }
    }
  }
`;

export const AvatarImage = styled.div`
  width: 75px;
  height: 75px;
  background: ${colors.avatarColor};
  border-radius: 100%;
  margin-right: 25px;
`;

export const ShowAllResults = styled(Flex)`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  color: ${colors.brand};
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-bottom: 0px;
  margin-top: 10px;
  height: 52px;
  background-color: ${colors.mLightGray};
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(103, 38, 241, 0.16);
  }
`;

export const DatePickerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 100%;

  @media (max-width: ${deviceSize.tablet}px) {
    left: 0;
    top: 100%;
    position: absolute;
  }
`;
