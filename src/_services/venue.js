import { get } from '_helpers/api';

function getVenueEvents(id) {
  return get('events', { venueId: id });
}

export const venueEventsService = {
  getVenueEvents,
};
