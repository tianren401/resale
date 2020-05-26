import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledNavigationGroup,
  GroupHeader,
  NavigationItem,
} from './styledComponents';

export const NavigationGroup = ({ title, links }) => {
  return (
    <StyledNavigationGroup direction="column" justify="space-between">
      <GroupHeader>{title}</GroupHeader>
      {links.map((link, index) => (
        <NavigationItem to={link.url} key={`link-${index}`}>
          {link.title}
        </NavigationItem>
      ))}
    </StyledNavigationGroup>
  );
};

NavigationGroup.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
};
