import React, { useEffect, useState } from 'react';

import {
  StyledTicketGroupListContainer,
  StyledTicketGroupList,
  StyledTicketListSection,
  StyledTicketListSectionTitle,
  VFSImageContainer,
  VFSImage,
  VFSImageMessage,
  NoTicketsContainer,
  StyledTextDiv,
} from './styledComponents';
import { TicketGroup } from './ticketGroup';
import { isMobileDevice } from '_helpers';
import vfsPlaceHolder from '_images/vfsPlaceHolder.svg';

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

  const renderTicketGroups = ({ tickets, isOnMap }) => {
    return tickets.map((ticketGroup) => {
      return (
        <TicketGroup
          key={ticketGroup.tgID}
          ticketGroupData={ticketGroup}
          vfsImage={vfsImage}
          setVFSImage={setVFSImage}
          setSeatMessage={setSeatMessage}
          isOnMap={isOnMap}
        />
      );
    });
  };

  const renderSegments = ticketDataSegmented.map((segment) => {
    if (segment.title) {
      return (
        <StyledTicketListSection key={segment.type}>
          <StyledTicketListSectionTitle>
            Tickets not shown on map
          </StyledTicketListSectionTitle>
          {renderTicketGroups({ tickets: segment.tickets, isOnMap: false })}
        </StyledTicketListSection>
      );
    } else {
      return (
        <StyledTicketListSection key={segment.type ?? 1}>
          {renderTicketGroups({ tickets: segment.tickets, isOnMap: true })}
        </StyledTicketListSection>
      );
    }
  });

  return ticketDataSegmented[0]?.tickets.length === 0 ? (
    <NoTicketsContainer>
      <StyledTextDiv fontWeight={'600'}>
        No tickets available for event
      </StyledTextDiv>
      <StyledTextDiv>Try modifying filters</StyledTextDiv>
    </NoTicketsContainer>
  ) : (
    <StyledTicketGroupListContainer>
      {vfsImage && !isMobileDevice && (
        <VFSImageContainer>
          <VFSImage src={vfsImage} alt={'view from seat'} />
          <VFSImageMessage>{seatMessage}</VFSImageMessage>
        </VFSImageContainer>
      )}
      <StyledTicketGroupList ref={ref}>{renderSegments}</StyledTicketGroupList>
    </StyledTicketGroupListContainer>
  );
});

TicketGroupList.propTypes = {};
TicketGroupList.displayName = 'TicketGroupList';
