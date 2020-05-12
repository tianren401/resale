import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Flex } from '_components/flex';
import { colors, deviceSize } from '_constants';
import { fontInter } from '_constants/fonts';

export const StyledFooter = styled(Flex)`
  min-height: 450px;
  background: #e5e5e5;
  width: 100%;
  padding: 0;
  color: ${colors.black};

  @media (min-width: ${deviceSize.tablet}px) {
    padding: 5% 20%;
  }
`;

export const TopInfoRow = styled(Flex)`
  margin: 70px 0;

  @media (min-width: ${deviceSize.tablet}px) {
    margin: 0 0 50px;
  }
`;

export const StyledNavigationGroup = styled(Flex)`
  width: 200px;
  height: 200px;
  ${fontInter};
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  margin: 8px 16px;
`;

export const GroupHeader = styled.div`
  font-weight: bold;
`;

export const NavigationItem = styled(Link)`
  color: ${colors.black1};
  margin-right: 16px;

  &:hover {
    color: ${colors.brandHover};
  }
`;

export const BottomNavigationItem = styled(Link)`
  color: ${colors.darkGray};
  margin-right: 16px;

  &:hover {
    color: ${colors.brandHover};
  }

  @media (min-width: ${deviceSize.tablet}px) {
    color: ${colors.black1};
  }
`;

export const BottomInfo = styled(Flex)`
  background: ${colors.white};
  min-height: 150px;
  padding: 24px 16px;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.darkGray};

  @media (min-width: ${deviceSize.tablet}px) {
    background: none;
    min-height: 0;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.black1};
  }
`;

export const BrandGroup = styled(Flex)`
  display: flex;

  @media (min-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;