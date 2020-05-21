import { ajaxGet } from '_helpers/api';

function getSeaticsData(eventId) {
  return ajaxGet(`maps/${eventId}`, 'jsonp');
}

export const seaticsService = {
  getSeaticsData,
};
