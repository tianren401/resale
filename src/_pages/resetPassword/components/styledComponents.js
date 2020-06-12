import styled from 'styled-components';

import { deviceSize, colors } from '_constants';
import { Form } from '_components';

export const StyledModal = styled.div`
  @media (max-width: ${deviceSize.tablet}px) {
    width: 100%;
  }
`;

export const StyledForm = styled(Form)`
  > div {
    width: 100%;
  }

  @media (max-width: ${deviceSize.tablet}px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  color: #6726f1;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${deviceSize.tablet}px) {
    justify-content: flex-start;
  }
`;

export const CloseButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;

  @media (max-width: ${deviceSize.tablet}px) {
    position: static;
    top: initial;
    right: initial;
    margin-right: 10px;
  }
`;

export const Title = styled.div`
  text-align: center;
  padding-bottom: 20px;
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;
`;

export const ForgotPasswordText = styled.div`
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #8d8d94;
  text-align: left;
  margin: 16px 0px 6px 0px;
`;

export const NoAccountText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #8d8d94;
  text-align: left;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 20px 32px 18px 32px;
  background-color: ${colors.brand};
  border-radius: 6px;
  border: none;
  font-size: 16px;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SwitchButton = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 20px 32px 18px 32px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid ${colors.brand};
  font-size: 16px;
  color: ${colors.brand};
`;

export const SwitchText = styled.span`
  cursor: pointer;
  color: ${colors.brand};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

export const ErrorMessage = styled.div`
  white-space: nowrap;
  padding: 10px 20px;
  width: 346px;
  height: 42px;
  background: #ffaba4;
  border: 2px solid #ff1600;
  border-radius: 24px;
  font-size: 14px;
  line-height: 22px;
  color: #e52210;
  margin: 30px auto;
`;

export const SuccessMessage = styled.div`
  white-space: nowrap;
  padding: 10px 20px;
  width: 346px;
  height: 42px;
  background: #a4ffab;
  border: 2px solid #00ff16;
  border-radius: 24px;
  font-size: 14px;
  line-height: 22px;
  color: black;
  margin: 30px auto;
`;

export const ResetPasswordText = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #8d8d94;
`;

export const BackToSignInText = styled.span`
  font-size: 14px;
  line-height: 22px;
  color: ${colors.brand};
`;
