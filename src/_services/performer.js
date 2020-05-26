import { get } from '_helpers/api';

function getPerformerEvents(id) {
  return get(`content/performer/${id}`, {
    //temporarily hard coded until we pass in values from the browser
    latitude: 32.7767,
    longitude: -96.797,
  });
}

export const performerEventsService = {
  getPerformerEvents,
};
