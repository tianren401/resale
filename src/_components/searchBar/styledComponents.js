import styled, { css } from 'styled-components';
import { colors, fontInter } from '_constants';
import { deviceSize } from '_constants';
import { Flex } from '_components/flex';

export const SearchContainer = styled.div`
  text-align: left;
  position: relative;
  height: 60px;
  background: ${colors.white};
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  @media (max-width: ${deviceSize.laptop}px) {
    width: 100%;
  }

  @media (min-width: ${deviceSize.laptop}px) {
    width: 846px;
  }
`;

export const SearchInput = styled.input`
  border: 4px solid transparent;
  width: 100%;
  box-sizing: border-box;
  padding: 4px;
  transition: width 0.3s;
  padding-left: 26px;
  padding-right: 26px;
  border-right: ${(props) =>
    props.hasNext ? `1px solid ${colors.darkGray}` : 'none'};
  ${fontInter}
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 22px;
  color: ${colors.darkGray};

  &:focus {
    width: 100%;
    outline: none;
  }
`;

const dropdownPosition = css`
  position: absolute;
  left: 2px;
  top: 49px;
  padding-left: 0;
  z-index: 1;
  padding: 10px 30px;
`;

export const AutocompleteList = styled.ul`
  display: block;
  list-style: none;
  
  transition: width 0.3s;
  background-color: ${colors.white};
  margin: auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  border-radius: 8px;
  ${dropdownPosition}

  @media (max-width: ${deviceSize.tablet}px) {
    max-width: 100%;
    width: 100%;
  }

  @media (min-width: ${deviceSize.tablet}px) {
    width: 100%;
    min-width: 30rem;
  }
`;

export const AutocompleteItem = styled.li`
  display: block;
  background: white;
  font-size: 1.2rem;
  margin-top: 10px;
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
`;

export const SectionHeader = styled(Flex)`
  h1 {
    ${fontInter}
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
  h2 {
    ${fontInter}
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${colors.black};
    margin: 0;
  }

  h3 {
    ${fontInter}
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.darkGray};
    margin: 0;
  }

  &:hover {
    h2 {
      color: ${colors.brand};
    }

    h3 {
      color: ${colors.black};
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
  ${fontInter}
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  border-radius: 8px;
  color: ${colors.brand};
  width: calc(100% + 60px);
  margin-left: -30px;
  margin-bottom: -10px;
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
