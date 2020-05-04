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
  height: 25vh;
  padding-top: 50px;
  width: 60%;
  margin: 0 auto;
  `;

const TopInfoRow = styled(FlexRow)`
  width: 50%;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  `

const BottomInfoRow = styled(FlexRow)`
  justify-content: space-between;
  align-items: center;
  flex: 1;
  `
const BottomLeftHalfInfoRow = styled(FlexRow)`
  width: 100%;
  align-items: center;
  flex: 1;
  `
const BottomRightHalfInfoRow = styled(FlexRow)`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  `

const StyledLink = styled(Link)`
  padding: 5px;
  font-family: Inter;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  `;

const HeaderLink = styled(StyledLink)`
  font-weight: bold;
  `;

export const Footer = () => (
    <StyledFooter>
        <TopInfoRow>
            <FlexColumn>
                <HeaderLink>Learn More</HeaderLink>
                <StyledLink>About</StyledLink>
                <StyledLink>SelectSeats Enterprise</StyledLink>
                <StyledLink>MLS Partnership</StyledLink>
                <StyledLink>Sell on SelectSeats</StyledLink>
                <StyledLink>Event News</StyledLink>
            </FlexColumn>
            <FlexColumn>
                <HeaderLink>Platform</HeaderLink>
                <StyledLink>Platform</StyledLink>
                <StyledLink>API Docs</StyledLink>
                <StyledLink>Dev Blog</StyledLink>
                <StyledLink>Dev Community</StyledLink>
                <StyledLink>Partner Program</StyledLink>
            </FlexColumn>
            <FlexColumn>
                <HeaderLink>Community</HeaderLink>
                <StyledLink>Help & Support</StyledLink>
                <StyledLink>Press</StyledLink>
                <StyledLink>Jobs</StyledLink>
                <StyledLink>Twitter</StyledLink>
                <StyledLink>Instagram</StyledLink>
            </FlexColumn>
        </TopInfoRow>
        <BottomInfoRow>
            <BottomLeftHalfInfoRow>© 2020 SelectSeats. All rights reserved. Made in Dallas</BottomLeftHalfInfoRow>
            <BottomRightHalfInfoRow>
                <StyledLink>Privacy Policy</StyledLink>
                <StyledLink>Terms of use</StyledLink>
                <StyledLink>Site map</StyledLink>
            </BottomRightHalfInfoRow>
        </BottomInfoRow>
    </StyledFooter>
)
