import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setPreCheckoutTicketDataAction } from '_store/checkoutTicket';
import vfsPlaceHolder from '_images/vfsPlaceHolder.svg';

const StyledTicketGroup = styled.tr`
  outline: 1px solid #f0f0f5;
  height: 72px;
`;

const TicketInformation = styled.td`
  align-content: center;
  padding: 20px;
`;

const TicketSectionRow = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const TicketQuantity = styled.p`
  font-size: 12px;
  color: #757575;
`;

const TicketPrice = styled.button`
  background-color: #6726f1;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  height: 35px;
  width: 80%;
`;

export const TicketGroup = ({
  ticketGroupData,
  vfsImage,
  setVFSImage,
  setSeatMessage,
}) => {
  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    window.Seatics.MapComponent.highlightTicket(ticketGroupData);
    if (!vfsImage) {
      return;
    }

    if (!ticketGroupData.section) {
      setSeatMessage('No image for selected seat');
    } else {
      setVFSImage(ticketGroupData.section?.vfsUrl || vfsPlaceHolder);
      setSeatMessage('');
    }
  };

  const handleMouseLeave = () => {
    window.Seatics.MapComponent.removeHighlight(ticketGroupData);
    if (!vfsImage) {
      return;
    }

    setVFSImage(vfsPlaceHolder);
    setSeatMessage('Hover over a seat');
  };

  const handleBuyButton = () => {
    const fullTicketData = ticketData.ticketGroupListRaw.find((ticketGroup) => {
      return ticketGroup.exchangeTicketGroupId === ticketGroupData.tgID;
    });

    dispatch(
      setPreCheckoutTicketDataAction({
        ticketGroupID: ticketGroupData.tgID,
        ticketGroupPrice: ticketGroupData.tgPrice,
        ticketGroupSection: ticketGroupData.tgUserSec,
        ticketGroupRow: ticketGroupData.tgUserRow,
        ticketGroupRange: ticketGroupData.tgRange,
        ticketGroupSplits: ticketGroupData.splits,
        deliveryTypeId: fullTicketData.nearTerm.nearTermDeliveryMethod.id,
        deliveryTypeName:
          fullTicketData.nearTerm.nearTermDeliveryMethod.description,
        vfsURL: ticketGroupData.section?.vfsUrl,
      })
    );
  };

  return (
    <StyledTicketGroup
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TicketInformation>
        <TicketSectionRow>
          {`Section ${ticketGroupData.tgUserSec} • Row ${ticketGroupData.tgUserRow}`}
        </TicketSectionRow>
        <TicketQuantity>
          {`${ticketGroupData?.tgRange[0]} - ${ticketGroupData?.tgRange[1]} Tickets`}
        </TicketQuantity>
      </TicketInformation>
      <td style={{ height: '100%' }}>
        <TicketPrice onClick={handleBuyButton}>
          {`$${ticketGroupData.tgPrice}/ea`}
        </TicketPrice>
      </td>
    </StyledTicketGroup>
  );
};

TicketGroup.propTypes = {
  ticketGroupData: PropTypes.objectOf(Object),
  setVFSImage: PropTypes.any,
  vfsImage: PropTypes.any,
  setSeatMessage: PropTypes.any,
};
