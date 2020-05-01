import React from 'react';
import styled from 'styled-components';

import { deviceSize } from '_constants';
import ctaSectionBackground from 'images/ctaSectionBackground.png';
import checkImageDesktop from 'images/checkImageDesktop.png';

const Container = styled.div`
  width: 100%;
  height: 466px;
  background: linear-gradient(
      116deg,
      rgba(255, 255, 255, 0.64) 16.44%,
      rgba(255, 255, 255, 0) 97.46%
    ),
    url(${ctaSectionBackground});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  margin-top: 93px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${deviceSize.tablet}) {
    height: 590px;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: 5%;
    padding-right: 22%;
  }
`;

const Comment = styled.div`
  text-align: center;
  font-weight: 600;
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
