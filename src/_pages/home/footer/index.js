import React from 'react';

import {
  StyledFooter,
  TopInfoRow,
  NavigationItem,
  BottomInfo,
  BrandGroup,
  BottomNavigationItem,
} from './styledComponents';
import { NavigationGroup } from './navigationGroup';
import { footerGroupData, footerPolicyData, footerBrands } from '_constants';
import { Flex, ContentImage } from '_components';

export const Footer = () => {
  return (
    <StyledFooter direction="column">
      <TopInfoRow direction="row" flexWrap="wrap" justify="flex-start">
        {footerGroupData.map((group, index) => (
          <NavigationGroup
            direction="column"
            title={group.title}
            links={group.links}
            key={`footer-group-${index}`}
          />
        ))}
      </TopInfoRow>
      <BottomInfo flexWrap="wrap" justify="space-between">
        <BrandGroup direction="row" justify="flex-start">
          {footerBrands.map((brand, index) => (
            <NavigationItem to={brand.url} key={`footer-policy-${index}`}>
              <ContentImage src={brand.img} alt={brand.title} />
            </NavigationItem>
          ))}
        </BrandGroup>
        <Flex>© 2020 SelectSeats. All rights reserved. Made in Dallas</Flex>
        <Flex justify="space-between" direction="row">
          {footerPolicyData.map((item, index) => (
            <BottomNavigationItem to={item.url} key={`footer-policy-${index}`}>
              {item.title}
            </BottomNavigationItem>
          ))}
        </Flex>
      </BottomInfo>
    </StyledFooter>
  );
};
