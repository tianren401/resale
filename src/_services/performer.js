import { get } from '_helpers/api';

function getPerformerEvents(id, location) {
  return get({
    path: `content/performer/${id}`,
    parameters: {
      latitude: location?.latitude || 32.8203525,
      longitude: location?.longitude || -97.011731,
    },
  });
}

const getPerformerImages = (ids) => {
  return get({
    path: `content/images/performers`,
    parameters: {
      performerIds: ids,
    },
  });
};

export const performerEventsService = {
  getPerformerEvents,
  getPerformerImages,
};
