import styled from 'styled-components';

import { colors } from '_constants';
import { deviceSize } from '_constants';
import { Flex } from '_components/flex';

export const AutocompleteItem = styled.li`
  display: block;
  background: white;
  font-size: 1.2rem;
  margin: 0;
  width: 100%;
  border-radius: 2px;

  &:hover {
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
  margin-top: -20px;
  margin-bottom: 10px;
`;

export const ItemList = styled.div`
  dislpay: flex;
  justify-content: space-around;
  text-align: center;

  @media (max-width: ${deviceSize.tablet}px) {
    width: 100%;
  }
`;

export const SectionHeader = styled(Flex)`
  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: black;
    text-transform: capitalize;
    margin-left: 21px;

    @media (max-width: ${deviceSize.tablet}px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
`;

export const SectionContainer = styled(Flex)`
  border: ${(props) => (props.border ? `1px solid ${colors.black}` : 'none')};
  padding: 0 21px;

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
