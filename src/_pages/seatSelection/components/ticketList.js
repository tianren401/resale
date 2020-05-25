import React from 'react';
import styled from 'styled-components';

import { TicketGroup } from './ticketGroup';

const StyledTicketList = styled.table`
  width: 100%;
`;

const StyledTableBody = styled.tbody`
  width: 100%;
  height: 100%;
`;

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
        <StyledTableBody key={segment.type}>
          <tr>
            <td>{segment.title}</td>
          </tr>
          {renderTicketGroups(segment.tickets)}
        </StyledTableBody>
      );
    } else {
      return (
        <StyledTableBody key={segment.type ?? 1}>
          {renderTicketGroups(segment.tickets)}
        </StyledTableBody>
      );
    }
  });

  return (
    <StyledTicketList ref={ref}>
      <colgroup>
        <col span={'1'} style={{ width: '65%' }} />
        <col span={'1'} style={{ width: '35%' }} />
      </colgroup>
      {renderSegments}
    </StyledTicketList>
  );
});

TicketList.propTypes = {};
TicketList.displayName = 'TicketList';
