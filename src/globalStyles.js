import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    box-sizing: border-box !important;
    background: white;
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    outline: none;
  }

  .rec-slider-container {
    margin: 0px;
  }
`;
