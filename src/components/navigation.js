import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavigation = styled.div`
  background-color: indianred;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  color: white;
`;

const NavigationItems = styled.div``;

const NavigationItem = styled(Link)`
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

export const Navigation = () => (
  <StyledNavigation>
    <Logo to="/">Logo</Logo>
    <NavigationItems>
      <NavigationItem to="/">Home</NavigationItem>
      <NavigationItem to="/login">Login</NavigationItem>
    </NavigationItems>
  </StyledNavigation>
);
