import { get } from '_helpers/api';

function getVenueEvents(id) {
  //temporarily hard coded until we pass in values from the browser
  return get({
    path: `content/venue/${id}`,
    parameters: { latitude: 32.7767, longitude: -96.797 },
  });
}

export const venueEventsService = {
  getVenueEvents,
};
