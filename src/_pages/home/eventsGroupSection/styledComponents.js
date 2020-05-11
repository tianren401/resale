import styled from 'styled-components';

import { deviceSize } from '_constants';

export const StyledGroup = styled.div`
  width: 100%;
  position: relative;
`;

export const TriangleOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(92.09deg, #455fe5 11.04%, #8245e5 99.21%);
  transform: matrix(1, -0.35, 0, 0.75, 0, 70);
  z-index: -1;

  @media (min-width: ${deviceSize.tablet}) {
    background-image: linear-gradient(
      184.56deg,
      #6751da -37.72%,
      #8245e5 30.62%,
      #ffffff 88.06%
    );
    transform: matrix(-1, 0.12, 0, 1.22, 0, 0);
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 80px 0 30px;
  max-width: 940px;

  @media (min-width: ${deviceSize.tablet}) {
    width: 100%;
    padding: 30px;
  }

  @media (min-width: ${deviceSize.laptop}) {
    width: 100%;
    padding: 30px 0;
  }
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: flex-end;
  color: #707070;
  margin: 12px 16px;

  > span {
    margin-left: 5px;
    font-size: 14px;
    color: #6726f1;
  }

  @media (min-width: ${deviceSize.tablet}) {
    & {
      color: #ebebeb;
      margin: 0px;
    }

    & > span {
      color: #fff;
    }
  }
`;

export const EventTypeNavigation = styled.div`
  width: calc(100% - 32px);
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin: 0 16px 10px;
  display: flex;
  flex-wrap: wrap;

  & > div {
    line-height: 40px;
    min-width: 150px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: middle;
    border-radius: 100px;
  }

  @media (min-width: ${deviceSize.tablet}) {
    font-size: 19px;
    line-height: 32px;
    margin: 0 0px 10px;
    width: 100%;

    & > div {
      padding: 0;
      background: none;
      border-radius: 0;
      margin: 0px;
      margin-right: 25px;
    }
  }

  @media (min-width: ${deviceSize.laptop}) {
    font-size: 24px;
    line-height: 32px;
  }
`;

export const SelectedTypeBtn = styled.div`
  color: #ffffff;
  background: #6726f1;
  border: 1px solid #8245e5;
  @media (min-width: ${deviceSize.tablet}) {
    border-bottom: 4px solid #ffffff;
  }
`;

export const UnselectedTypeBtn = styled.div`
  color: #6726f1;
  background: #fff;
  cursor: pointer;
  border: 1px solid #8245e5;
  @media (min-width: ${deviceSize.tablet}) {
    color: #d3bef7;
    border: none;
  }
`;
