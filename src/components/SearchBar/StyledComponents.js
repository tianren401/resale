import styled, { css } from 'styled-components';
import { colors } from 'theme';
import { Flex } from 'components';

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
  top: 61px;
  padding-left: 0;
  z-index: 1;
`;

export const AutocompleteList = styled.ul`
  display: block;
  list-style: none;
  width: 30rem;
  transition: width 0.3s;
  margin: auto;
  ${dropdownPosition}
`;

export const AutoCompletItem = styled.li`
  display: block;
  background: white;
  margin: 10px auto;
  padding: 10px;
  font-size: 1.2rem;
  width: 100%;
  border-radius: 2px;

  &:hover {
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
  color: white;
  ${dropdownPosition}
`;
