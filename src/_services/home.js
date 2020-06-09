import { get } from '_helpers/api';

function getHome(location) {
  //temporarily hard coded until we pass in values from the browser
  return get({
    path: 'content/home',
    parameters: location || { latitude: 32.7767, longitude: -96.797 },
  });
}

export const homeService = {
  getHome,
};
