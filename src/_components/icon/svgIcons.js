import * as React from 'react';
import PropTypes from 'prop-types';

import { colors } from '_constants';

const defaultSVGProps = {
  width: 24,
  height: 24,
  fill: colors.brand,
};

export const DropdownExpandIcon = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Shape">
      <path
        d="M4.29088 5.70641L0.293728 1.71116C0.105657 1.52318 0 1.26822 0 1.00237C0 0.448778 0.448992 0 1.00285 0L8.99715 0C9.26312 0 9.5182 0.105607 9.70627 0.293589C10.0979 0.68504 10.0979 1.31971 9.70627 1.71116L5.70912 5.70641C5.31748 6.09786 4.68252 6.09786 4.29088 5.70641Z"
        fill="#6726F1"
      />
      <path
        d="M4.29088 5.70641L0.293728 1.71116C0.105657 1.52318 0 1.26822 0 1.00237C0 0.448778 0.448992 0 1.00285 0L8.99715 0C9.26312 0 9.5182 0.105607 9.70627 0.293589C10.0979 0.68504 10.0979 1.31971 9.70627 1.71116L5.70912 5.70641C5.31748 6.09786 4.68252 6.09786 4.29088 5.70641Z"
        fill="#272729"
        fillOpacity="0.16"
      />
    </g>
  </svg>
);

DropdownExpandIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

DropdownExpandIcon.defaultProps = {
  ...defaultSVGProps,
  width: 10,
  height: 6,
  fill: 'none',
};

export const DropdownCollapseIcon = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Shape">
      <path
        d="M5.70912 0.293588L9.70627 4.28884C9.89434 4.47682 10 4.73178 10 4.99763C10 5.55122 9.55101 6 8.99715 6L1.00285 6C0.736878 6 0.481799 5.89439 0.293728 5.70641C-0.0979099 5.31496 -0.0979098 4.68029 0.293728 4.28884L4.29088 0.293588C4.68252 -0.0978637 5.31749 -0.0978636 5.70912 0.293588Z"
        fill="#6726F1"
      />
      <path
        d="M5.70912 0.293588L9.70627 4.28884C9.89434 4.47682 10 4.73178 10 4.99763C10 5.55122 9.55101 6 8.99715 6L1.00285 6C0.736878 6 0.481799 5.89439 0.293728 5.70641C-0.0979099 5.31496 -0.0979098 4.68029 0.293728 4.28884L4.29088 0.293588C4.68252 -0.0978637 5.31749 -0.0978636 5.70912 0.293588Z"
        fill="#272729"
        fillOpacity="0.16"
      />
    </g>
  </svg>
);

DropdownCollapseIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

DropdownCollapseIcon.defaultProps = {
  ...defaultSVGProps,
  width: 10,
  height: 6,
  fill: 'none',
};

export const TickIcon = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Shape"
      d="M5 9.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071L0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289C0.683418 5.90237 1.31658 5.90237 1.70711 6.29289L5 9.58579Z"
      fill="#6726F1"
    />
  </svg>
);

TickIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

TickIcon.defaultProps = {
  ...defaultSVGProps,
  width: 16,
  height: 12,
  fill: 'none',
};

export const ChevronRightIcon = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Shape">
      <path
        d="M5.68294 8.00002L0.240762 1.65081C-0.118661 1.23148 -0.0700991 0.600184 0.349227 0.240762C0.768553 -0.118661 1.39985 -0.0700991 1.75927 0.349227L7.75927 7.34923C8.08027 7.72372 8.08027 8.27632 7.75927 8.65081L1.75927 15.6508C1.39985 16.0701 0.768553 16.1187 0.349227 15.7593C-0.0700991 15.3999 -0.118661 14.7686 0.240762 14.3492L5.68294 8.00002Z"
        fill="#6726F1"
      />
      <path
        d="M5.68294 8.00002L0.240762 1.65081C-0.118661 1.23148 -0.0700991 0.600184 0.349227 0.240762C0.768553 -0.118661 1.39985 -0.0700991 1.75927 0.349227L7.75927 7.34923C8.08027 7.72372 8.08027 8.27632 7.75927 8.65081L1.75927 15.6508C1.39985 16.0701 0.768553 16.1187 0.349227 15.7593C-0.0700991 15.3999 -0.118661 14.7686 0.240762 14.3492L5.68294 8.00002Z"
        fill="#272729"
        fillOpacity="0.16"
      />
    </g>
  </svg>
);

ChevronRightIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

ChevronRightIcon.defaultProps = {
  ...defaultSVGProps,
  width: 8,
  height: 16,
  fill: 'none',
};

export const LocationIcon = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Icons / Location / Outlined">
      <g id="Icon">
        <g id="Shape">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22C7.33333 17.0762 5 12.817 5 9.22222C5 5.08009 8.13401 2 12 2C15.866 2 19 5.08009 19 9.22222C19 12.817 16.6667 17.0762 12 22ZM17 9.22222C17 6.23033 14.8061 4 12 4C9.1939 4 7 6.23033 7 9.22222C7 11.8443 8.63441 15.1385 12 19.0248C15.3656 15.1385 17 11.8443 17 9.22222ZM10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9Z"
            fill="#6726F1"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22C7.33333 17.0762 5 12.817 5 9.22222C5 5.08009 8.13401 2 12 2C15.866 2 19 5.08009 19 9.22222C19 12.817 16.6667 17.0762 12 22ZM17 9.22222C17 6.23033 14.8061 4 12 4C9.1939 4 7 6.23033 7 9.22222C7 11.8443 8.63441 15.1385 12 19.0248C15.3656 15.1385 17 11.8443 17 9.22222ZM10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9Z"
            fill="#272729"
            fillOpacity="0.16"
          />
        </g>
      </g>
    </g>
  </svg>
);

LocationIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

LocationIcon.defaultProps = {
  ...defaultSVGProps,
  width: 24,
  height: 24,
  fill: 'none',
};

export const SearchFilterIcon = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Icon / Filter">
      <path
        id="Vector 12"
        d="M0 3H20M0 10H20M0 17H20M4.44444 0V6M15.5556 14V20M10 7V13"
        stroke="#6726F1"
        strokeWidth="2"
      />
    </g>
  </svg>
);

SearchFilterIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

SearchFilterIcon.defaultProps = {
  ...defaultSVGProps,
  width: 20,
  height: 20,
  fill: 'none',
};

export const CloseModalIcon = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Icon">
      <path
        id="Shape"
        d="M8.82141 10.0002L3.57733 4.75609C3.25189 4.43065 3.25189 3.90301 3.57733 3.57757C3.90277 3.25214 4.4304 3.25214 4.75584 3.57757L9.99992 8.82165L15.244 3.57757C15.5694 3.25214 16.0971 3.25214 16.4225 3.57757C16.7479 3.90301 16.7479 4.43065 16.4225 4.75609L11.1784 10.0002L16.4225 15.2442C16.7479 15.5697 16.7479 16.0973 16.4225 16.4228C16.0971 16.7482 15.5694 16.7482 15.244 16.4228L9.99992 11.1787L4.75584 16.4228C4.4304 16.7482 3.90277 16.7482 3.57733 16.4228C3.25189 16.0973 3.25189 15.5697 3.57733 15.2442L8.82141 10.0002Z"
        fill={colors.brand}
      />
    </g>
  </svg>
);

CloseModalIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

CloseModalIcon.defaultProps = {
  ...defaultSVGProps,
  width: 20,
  height: 20,
  fill: 'none',
};
