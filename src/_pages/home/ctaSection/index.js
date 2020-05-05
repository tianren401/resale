import React from 'react';
import styled from 'styled-components';

import { deviceSize } from '_constants';
import ctaSectionBackground from '_images/ctaSectionBackground.png';
import checkImageDesktop from '_images/checkImageDesktop.png';

const Container = styled.div`
  width: 100%;
  height: 65vh;
  background: url(${ctaSectionBackground});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  margin-top: 93px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (min-width: ${deviceSize.tablet}) {
    height: 65vh;
    min-height: 500px;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: 5%;
    padding-right: 22%;
  }
`;

const TriangleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0% 0%, 0% 100%, 100% 0%);
  background: linear-gradient(
    277.05deg,
    rgba(0, 40, 247, 0.4) 8.08%,
    rgba(105, 27, 236, 0.4) 99.19%
  );
`;

const Comment = styled.div`
  text-align: center;
  font-weight: 500;
  width: 70%;

  @media (min-width: ${deviceSize.tablet}) {
    text-align: right;
    width: 100%;
  }

  @media (min-width: ${deviceSize.laptop}) {
    text-align: right;
  }
`;

const CommentTitle = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: #fff;

  @media (min-width: ${deviceSize.tablet}) {
    font-size: 28px;
    line-height: 42px;
    color: #000;
  }

  @media (min-width: ${deviceSize.laptop}) {
    font-size: 36px;
  }
`;

const CommentContent = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #787878;

  @media (min-width: ${deviceSize.tablet}) {
    font-size: 18px;
    line-height: 32px;
  }

  @media (min-width: ${deviceSize.laptop}) {
    font-size: 24px;
  }
`;

const Check = styled.div`
  width: 56px;
  height: 56px;
  border: 5px solid #404040;
  border-radius: 10px;
  margin-bottom: 30px;
  margin-right: 24px;
  position: relative;
`;

const CheckImg = styled.div`
  width: 65px;
  height: 51px;
  background: url(${checkImageDesktop});
  position: absolute;
  bottom: 9px;
  left: 4px;
`;

export const CTASection = () => {
  return (
    <Container>
      <TriangleOverlay />
      <Check>
        <CheckImg />
      </Check>
      <Comment>
        <CommentTitle>Verified and secured tickets everytime</CommentTitle>
        <CommentContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</CommentContent>
      </Comment>
    </Container>
  );
};
