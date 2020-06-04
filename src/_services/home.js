import { get } from '_helpers/api';

function getHome() {
  //temporarily hard coded until we pass in values from the browser
  return get({
    path: 'content/home',
    parameters: { latitude: 32.7767, longitude: -96.797 },
  });
}

export const homeService = {
  getHome,
};
