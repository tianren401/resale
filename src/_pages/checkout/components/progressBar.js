import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors, deviceSize } from '_constants';
import { isMobileDevice } from '_helpers';
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
  z-index: 2;

  @media (max-width: ${deviceSize.tablet}px) {
    position: static;
    justify-content: flex-start;
    padding: 16px 20px;
  }
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

  ${(props) =>
    props.last &&
    `&:after {
      display: none;
    }
    `}

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

  @media (max-width: ${deviceSize.tablet}px) {
    display: none;
  }
`;

const MobileStep = styled.span`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${colors.gray};
  text-shadow: 0px 0px 4px rgba(255, 220, 252, 0.5);
  display: none;

  &:after {
    content: '>';
    color: ${colors.darkGray};
    padding: 0 13px;
  }

  ${(props) =>
    props.last &&
    `&:after {
      display: none;
    }
    `}

  ${(props) =>
    (props.state === 'active' || props.state === 'passed') &&
    `& { color: ${colors.brand};
    text-shadow: 0px 0px 4px rgba(255, 220, 252, 0.5);
    `}

  ${(props) =>
    props.stageIndex === 2 &&
    `& {
      color: ${colors.white};
    }
    &:after {
      color: ${colors.white};
    }
    `}

  @media (max-width: ${deviceSize.tablet}px) {
    display: block;
  }
`;

export const ProgressBar = ({ stageIndex }) => {
  const stages = isMobileDevice
    ? ['Delivery', 'Payment', 'Place']
    : ['Delivery Information', 'Payment Information', 'Place Order'];

  return (
    <Container>
      {stages.map((stage, index) => {
        let state = '';
        if (index < stageIndex) {
          state = 'passed';
        } else if (index === stageIndex) {
          state = 'active';
        }
        const last = index === 2 ? true : false;
        return (
          <div key={`checkoutMobileStage${index}`}>
            {isMobileDevice ? (
              <MobileStep state={state} last={last} stageIndex={stageIndex}>
                {stage}
              </MobileStep>
            ) : (
              <Step state={state} last={last}>
                {stage}
              </Step>
            )}
          </div>
        );
      })}
    </Container>
  );
};

ProgressBar.propTypes = {
  stageIndex: PropTypes.number,
};
