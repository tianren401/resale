import styled, { css } from 'styled-components';
import { colors } from 'theme';
import { Flex } from '_components/Flex';

export const SearchContainer = styled.div`
  text-align: left;
  position: relative;
  width: 846px;
  height: 60px;
  left: calc(50% - 846px / 2);
  background: #fbfbfb;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);
  border-radius: 10.0801px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SearchInput = styled.input`
  border: 4px solid transparent;
  width: 100%;
  box-sizing: border-box;
  padding: 4px;
  transition: width 0.3s;
  padding-left: 26px;
  padding-right: 26px;
  border-right: 1px solid ${colors.gray};
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 22px;

  color: ${colors.gray};

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
  width: 30rem;
  transition: width 0.3s;
  background-color: ${colors.white};
  margin: auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1),
    0px 0px 2px rgba(130, 136, 148, 0.16);
  border-radius: 8px;
  ${dropdownPosition}
`;

export const AutocompleteItem = styled.li`
  display: block;
  background: white;
  font-size: 1.2rem;
  margin-top: 10px;
  width: 100%;
  border-radius: 2px;

  &:hover {
    background-color: ${colors.lightGray};
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
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: ${colors.black};
    text-transform: capitalize;
  }

  border-bottom: 5px solid rgba(0, 0, 0, 0.2);
`;

export const SectionContainer = styled(Flex)`
  border: ${(props) => (props.border ? `1px solid ${colors.black}` : 'none')};
  padding: 10px;
  h2 {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: ${colors.black};
  }

  h3 {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: ${colors.black};
  }
`;

export const AvatarImage = styled.div`
  width: 75px;
  height: 75px;
  background: ${colors.darkGray};
  border-radius: 100%;
  margin-right: 25px;
`;

export const ShowAllResults = styled(Flex)`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  color: ${colors.black};
  width: calc(100% + 60px);
  margin-left: -30px;
  margin-bottom: -10px;
  margin-top: 10px;
  height: 52px;
  background-color: ${colors.darkGray};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
