import { ajaxGet } from '_helpers/api';

function getTicketGroupList(eventId) {
  return ajaxGet(`ticketgroups/${eventId}`, 'json');
}

export const ticketGroupListService = {
  getTicketGroupList,
};
