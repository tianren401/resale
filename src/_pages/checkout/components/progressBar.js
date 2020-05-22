import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '_constants';
import checkImageMobile from '_images/checkImageMobile.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  position: absolute;
  right: 20%;
  top: 90px;
`;
const Step = styled.span`
  font-size: 12px;
  line-height: 16px;
  position: relative;
  text-align: center;
  color: rgba(210, 152, 255, 0.8);
  width: 120px;

  &:before {
    content: ' ';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(210, 152, 255, 0.8);
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translate(-50%);
    background: transparent;
    box-sizing: border-box;
  }

  &:after {
    content: '';
    height: 1px;
    width: 140px;
    background: rgba(210, 152, 255, 0.8);
    position: absolute;
    bottom: calc(100% + 15px);
    left: 80px;
    box-sizing: border-box;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  ${(props) =>
    props.state === 'passed' &&
    `& {
    color: rgba(237, 215, 255, 0.8);

    :before {
      border: none;
      background: ${colors.white};
      background-image: url(${checkImageMobile});
      background-size: 80% 60%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }`}

  ${(props) =>
    props.state === 'active' &&
    `& { color: #edd7ff;
    text-shadow: 0px 0px 5px rgba(237, 215, 255, 0.5);

    :before {
      border-color: #edd7ff;
    }}`}
`;

const stages = ['Delivery Information', 'Payment Information', 'Place Order'];

export const ProgressBar = ({ stageIndex }) => {
  return (
    <Container>
      {stages.map((stage, index) => {
        let state = '';
        if (index < stageIndex) {
          state = 'passed';
        } else if (index === stageIndex) {
          state = 'active';
        }
        return (
          <Step key={`checkoutStage${index}`} state={state}>
            {stage}
          </Step>
        );
      })}
    </Container>
  );
};

ProgressBar.propTypes = {
  stageIndex: PropTypes.number,
};
