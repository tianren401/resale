import { get } from '_helpers/api';

function getPerformerEvents(id) {
  return get({
    path: `content/performer/${id}`,
    parameters: {
      //temporarily hard coded until we pass in values from the browser
      latitude: 32.7767,
      longitude: -96.797,
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
