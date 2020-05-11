import { get } from '_helpers/api';

function getEvents(page, size) {
  return get('events', { page, size });
}

export const eventsService = {
  getEvents,
};
