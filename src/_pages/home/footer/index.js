import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledFooter = styled(FlexColumn)`
  height: 55vh;
  min-height: 450px;
  background: #e5e5e5;
  width: 100%;
  padding: 5% 20%;
  color: #3e3e3e;
`;

const TopInfoRow = styled(FlexRow)`
  width: 50%;
  margin-top: 50px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const BottomInfoRow = styled(FlexRow)`
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const BottomLeftHalfInfoRow = styled(FlexRow)`
  width: 100%;
  align-items: center;
  flex: 1;
`;

const BottomRightHalfInfoRow = styled(FlexRow)`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const StyledLink = styled(Link)`
  padding: 5px;
  font-family: Inter;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #3e3e3e;
`;

const HeaderLink = styled(StyledLink)`
  font-weight: bold;
`;

export const Footer = () => (
  <StyledFooter>
    <TopInfoRow>
      <FlexColumn>
        <HeaderLink to="/">Learn More</HeaderLink>
        <StyledLink to="/">About</StyledLink>
        <StyledLink to="/">SelectSeats Enterprise</StyledLink>
        <StyledLink to="/">MLS Partnership</StyledLink>
        <StyledLink to="/">Sell on SelectSeats</StyledLink>
        <StyledLink to="/">Event News</StyledLink>
      </FlexColumn>
      <FlexColumn>
        <HeaderLink to="/">Platform</HeaderLink>
        <StyledLink to="/">Platform</StyledLink>
        <StyledLink to="/">API Docs</StyledLink>
        <StyledLink to="/">Dev Blog</StyledLink>
        <StyledLink to="/">Dev Community</StyledLink>
        <StyledLink to="/">Partner Program</StyledLink>
      </FlexColumn>
      <FlexColumn>
        <HeaderLink to="/">Community</HeaderLink>
        <StyledLink to="/">Help & Support</StyledLink>
        <StyledLink to="/">Press</StyledLink>
        <StyledLink to="/">Jobs</StyledLink>
        <StyledLink to="/">Twitter</StyledLink>
        <StyledLink to="/">Instagram</StyledLink>
      </FlexColumn>
    </TopInfoRow>
    <BottomInfoRow>
      <BottomLeftHalfInfoRow>
        © 2020 SelectSeats. All rights reserved. Made in Dallas
      </BottomLeftHalfInfoRow>
      <BottomRightHalfInfoRow>
        <StyledLink to="/">Privacy Policy</StyledLink>
        <StyledLink to="/">Terms of use</StyledLink>
        <StyledLink to="/">Site map</StyledLink>
      </BottomRightHalfInfoRow>
    </BottomInfoRow>
  </StyledFooter>
);
