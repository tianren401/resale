export const navigationHeight = 60;
export const deviceSize = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const colors = {
  brand: '#6726f1',
  brandHover:
    'linear-gradient(0deg, rgba(39, 39, 41, 0.16), rgba(39, 39, 41, 0.16)), #6726F1',
  lightBrand: 'rgba(103, 38, 241, 0.16)',
  lightBrandHover: 'rgba(103, 38, 241, 0.24)',
  success: '#3DCC79',
  successHover:
    'linear-gradient(0deg, rgba(39, 39, 41, 0.12), rgba(39, 39, 41, 0.12)), #3DCC79',
  lightSuccess: 'rgba(61, 204, 121, 0.16)',
  lightSuccessHover: 'rgba(61, 204, 121, 0.24)',
  darkGray: '#8d8d94',
  gray: '#babbc2',
  avatarColor: '#c4c4c4',
  lightGray: '#e6e6eb',
  mLightGray: '#f0f0f5',
  black: '#272729',
  black1: '#3e3e3e',
  white: '#ffffff',
  whiteSmoke: '#f5f5f5',
  danger: '#FF695B',
  dangerHover:
    'linear-gradient(0deg, rgba(39, 39, 41, 0.12), rgba(39, 39, 41, 0.12)), #FF695B',
  gradientVioletBlue:
    'inear-gradient(97.6deg, #455FE5 -14.65%, #9545E5 79.56%)',
  blue: '#007',
  darkBlue: '#004',
  lightBlue: '#44b',
  red: '#b44',
  green: '#3a3',
  orange: '#fa3',
  purple: '#a3f',
};

export const shadows = {
  small:
    '0px 2px 4px rgba(130, 136, 148, 0.16), 0px 0px 1px rgba(130, 136, 148, 0.16)',
  medium:
    '0px 4px 20px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(130, 136, 148, 0.16)',
  large:
    '0px 7px 40px rgba(0, 0, 0, 0.15), 0px 0px 4px rgba(130, 136, 148, 0.16), 0px 0px 2px rgba(130, 136, 148, 0.08)',
};

const BASE = 1000;
const OVERLAY = BASE + 100;

export const zIndexes = {
  BASE,
  DROPDOWN_FILTER: BASE + 1,
  POPOVER: BASE + 2,
  OVERLAY,
  DROPDOWN_CLIENT_HEADER: OVERLAY + 1,
};
