import React from 'react';
import { TicketGroup } from './ticketGroup';

export const TicketList = React.forwardRef((props, ref) => {
  const [ticketDataSegmented, setTicketDataSegmentd] = React.useState([]);

  React.useImperativeHandle(ref, () => ({
    updateTicketDataSegmented: (newTicketDataSegmented) => {
      setTicketDataSegmentd(newTicketDataSegmented);
    },
  }));

  const renderTicketGroups = (tickets) => {
    return tickets.map((ticketGroup) => {
      return (
        <TicketGroup key={ticketGroup.tgID} ticketGroupData={ticketGroup} />
      );
    });
  };

  const renderSegments = ticketDataSegmented.map((segment) => {
    if (segment.title) {
      return (
        <tbody key={segment.type}>
          <tr>
            <td>{segment.title}</td>
          </tr>
          {renderTicketGroups(segment.tickets)}
        </tbody>
      );
    } else {
      return <tbody key={1}>{renderTicketGroups(segment.tickets)}</tbody>;
    }
  });

  return <table ref={ref}>{renderSegments}</table>;
});

TicketList.propTypes = {};
TicketList.displayName = 'TicketList';
