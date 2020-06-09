import styled from 'styled-components';

import { DateRangeDropdown } from '_components';
import { Places } from '_components/places';
import { deviceSize, colors } from '_constants';

export const ComponentContainer = styled.div`
  width: 100%;
  background-color: white;
`;

export const DayPickerRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px auto;
  padding: 20px;

  @media (max-width: ${deviceSize.tablet}px) {
    padding: 10px;

    > div:nth-child(2n) {
      margin-left: 20px;
    }
  }
`;

export const UpcomingText = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

export const ColoredLocationText = styled.span`
  color: ${colors.brand};
  margin-left: 5px;
  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const LocationText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  color: ${colors.darkGray};

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledDateRangeDropdown = styled(DateRangeDropdown)`
  width: auto;
`;

export const StyledPlaces = styled(Places)`
  max-width: 200px;
`;
