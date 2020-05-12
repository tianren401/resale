import React from 'react';
import PropTypes from 'prop-types';

export const TicketGroup = (props) => {
  const tgData = props.ticketGroupData;

  return (
    <tr
      onMouseEnter={() => window.Seatics.MapComponent.highlightTicket(tgData)}
      onMouseLeave={() => window.Seatics.MapComponent.removeHighlight(tgData)}
    >
      <td>
        {'Section: ' +
          tgData.tgUserSec +
          ' - No. of Tix: ' +
          tgData.tgQty +
          ' - Price: ' +
          tgData.tgPrice}
      </td>
    </tr>
  );
};

TicketGroup.propTypes = {
  ticketGroupData: PropTypes.objectOf(Object),
};
