import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px 0;
  max-width: 960px;

  > div {
    margin-bottom: 38px;
  }
`;

export const Header = styled.span`
  margin-bottom: 28px;
  margin-left: 10px;
  display: block;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

export const Filter = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #5a5a5a;
  margin-bottom: 3px;

  > span {
    font-size: 14px;
    line-height: 20px;
    color: #6726f1;
    font-weight: 500;
  }
`;
