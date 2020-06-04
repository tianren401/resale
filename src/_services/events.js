import { get } from '_helpers/api';

function getEvents(page, size) {
  return get({ path: 'events', parameters: { page, size } });
}

export const eventsService = {
  getEvents,
};
