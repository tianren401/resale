import { deviceSize } from '_constants';
export const isMobileDevice =
  document.body && document.body.clientWidth <= deviceSize.tablet;
