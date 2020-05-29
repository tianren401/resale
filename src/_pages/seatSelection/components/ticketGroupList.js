import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { TicketGroup } from './ticketGroup';
import vfsPlaceHolder from '_images/vfsPlaceHolder.svg';

const StyledTicketList = styled.table`
  width: 100%;
`;

const StyledTableBody = styled.tbody`
  width: 100%;
  height: 100%;
`;

const SeatImageContainer = styled.div`
  height: 162px;
  width: 280px;
  margin: 30px 20px;
`;

const SeatImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;

const SeatImageMessage = styled.p`
  position: absolute;
  top: 81px;
  height: 81px;
  width: 280px;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #babbc2;
`;

export const TicketGroupList = React.forwardRef((props, ref) => {
  const [ticketDataSegmented, setTicketDataSegmentd] = React.useState([]);
  const [vfsImage, setVFSImage] = useState(null);
  const [seatMessage, setSeatMessage] = useState('Hover over a seat');

  useEffect(() => {
    ticketDataSegmented.forEach((segment) => {
      segment.tickets.forEach((ticket) => {
        if (ticket.section?.vfsUrl) {
          setVFSImage(vfsPlaceHolder);
          return;
        }
      });
    });
  }, [ticketDataSegmented]);

  React.useImperativeHandle(ref, () => ({
    updateTicketDataSegmented: (newTicketDataSegmented) => {
      setTicketDataSegmentd(newTicketDataSegmented);
    },
  }));

  const renderTicketGroups = (tickets) => {
    return tickets.map((ticketGroup) => {
      return (
        <TicketGroup
          key={ticketGroup.tgID}
          ticketGroupData={ticketGroup}
          vfsImage={vfsImage}
          setVFSImage={setVFSImage}
          setSeatMessage={setSeatMessage}
        />
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
    <div>
      {vfsImage && (
        <SeatImageContainer>
          <SeatImage src={vfsImage} alt={'view from seat'} />
          <SeatImageMessage>{seatMessage}</SeatImageMessage>
        </SeatImageContainer>
      )}
      <StyledTicketList ref={ref}>
        <colgroup>
          <col span={'1'} style={{ width: '65%' }} />
          <col span={'1'} style={{ width: '35%' }} />
        </colgroup>
        {renderSegments}
      </StyledTicketList>
    </div>
  );
});

TicketGroupList.propTypes = {};
TicketGroupList.displayName = 'TicketGroupList';
