import { get } from '_helpers/api';

function getPerformerEvents(id) {
  return get('events', { performerId: id });
}

export const performerEventsService = {
  getPerformerEvents,
};
