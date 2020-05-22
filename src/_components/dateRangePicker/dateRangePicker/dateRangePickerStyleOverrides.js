import { css } from 'styled-components';

import { deviceSize } from '_constants';

export const dateRangePickerStyleOverrides = css`
  .DayPicker-Caption {
    display: table-caption;
    margin-bottom: 10px;
    text-align: center;
  }

  .DayPicker-Caption > div {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  .DayPicker-wrapper {
    position: relative;
    flex-direction: row;
    padding-bottom: 0px;

    -webkit-user-select: none;

    -moz-user-select: none;

    -ms-user-select: none;

    user-select: none;
  }

  .DayPicker-Month {
    @media (max-width: ${deviceSize.tablet}px) {
      width: 100%;
    }
  }

  .Selectable
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #6726f1 !important;
    color: white;

    @media (max-width: ${deviceSize.tablet}px) {
      background: rgba(103, 38, 241, 0.16) !important;
      color: black;
    }
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    position: relative;
    background-color: #6726f1;
    color: rgba(103, 38, 241, 0.16);

    @media (max-width: ${deviceSize.tablet}px) {
      background: rgba(103, 38, 241, 0.16);
      color: black;
    }
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background: rgba(103, 38, 241, 0.16);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    position: relative;
    background-color: #6726f1;
    color: white;

    @media (max-width: ${deviceSize.tablet}px) {
      background: rgba(103, 38, 241, 0.16);
      color: black;
    }
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: #6726f1;

    @media (max-width: ${deviceSize.tablet}px) {
      background: rgba(103, 38, 241, 0.16);
      color: black;
    }
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background-color: #6726f1;
    border-radius: 50% !important;

    @media (max-width: ${deviceSize.tablet}px) {
      background: rgba(103, 38, 241, 0.16);
      color: black;
    }
  }

  .Range
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: 6726f1 !important;
    color: white;
    border-radius: 0;
  }
  .Range .DayPicker-Day {
    border-radius: 0 !important;
  }

  .Range .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Range .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }

  .DayPicker-Day--today {
    color: black;
    font-weight: 700;
  }
`;
