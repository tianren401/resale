import React from 'react';
import styled from 'styled-components';

import { TicketGroup } from './ticketGroup';

const Container = styled.div`
  width: 20%;
  height: 100%;
`;

const StyledTicketList = styled.table`
  width: 100%;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.15);
  overflow: auto;
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

  return (
    <Container>
      <StyledTicketList ref={ref}>
        <colgroup>
          <col span={'1'} style={{ width: '70%' }} />
          <col span={'1'} style={{ width: '30%' }} />
        </colgroup>
        {renderSegments}
      </StyledTicketList>
    </Container>
  );
});

TicketList.propTypes = {};
TicketList.displayName = 'TicketList';
