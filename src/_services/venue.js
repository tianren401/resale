import { get } from '_helpers/api';

function getVenueEvents(id) {
  //temporarily hard coded until we pass in values from the browser
  return get(`content/venue/${id}`, { latitude: 32.7767, longitude: -96.797 });
}

export const venueEventsService = {
  getVenueEvents,
};
