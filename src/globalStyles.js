import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: white;
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    outline: none;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  .rec-slider-container {
    margin: 0px;
  }
`;
