import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setPreCheckoutTicketDataAction } from '_store/checkoutTicket';

const StyledTicketGroup = styled.tr`
  outline: 1px solid #f0f0f5;
  height: 50%;
`;

const TicketInformation = styled.td`
  align-content: center;
  padding: 5%;
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

export const TicketGroup = (props) => {
  const tgData = props.ticketGroupData;
  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const dispatch = useDispatch();

  const handleBuyButton = () => {
    const fullTicketData = ticketData.ticketGroupListRaw.find((ticketGroup) => {
      return ticketGroup.exchangeTicketGroupId === tgData.tgID;
    });

    dispatch(
      setPreCheckoutTicketDataAction({
        ticketGroupID: tgData.tgID,
        ticketGroupPrice: tgData.tgPrice,
        ticketGroupSection: tgData.tgUserSec,
        ticketGroupRow: tgData.tgUserRow,
        ticketGroupRange: tgData.tgRange,
        ticketGroupSplits: tgData.splits,
        deliveryTypeId: fullTicketData.nearTerm.nearTermDeliveryMethod.id,
        deliveryTypeName:
          fullTicketData.nearTerm.nearTermDeliveryMethod.description,
        vfsURL: tgData.section?.vfsUrl,
      })
    );
  };

  return (
    <StyledTicketGroup
      onMouseEnter={() => window.Seatics.MapComponent.highlightTicket(tgData)}
      onMouseLeave={() => window.Seatics.MapComponent.removeHighlight(tgData)}
    >
      <TicketInformation>
        <TicketSectionRow>
          {`Section ${tgData.tgUserSec} • Row ${tgData.tgUserRow}`}
        </TicketSectionRow>
        <TicketQuantity>
          {`${tgData?.tgRange[0]} - ${tgData?.tgRange[1]} Tickets`}
        </TicketQuantity>
      </TicketInformation>
      <td style={{ height: '100%' }}>
        <TicketPrice onClick={handleBuyButton}>
          {`$${tgData.tgPrice}/ea`}
        </TicketPrice>
      </td>
    </StyledTicketGroup>
  );
};

TicketGroup.propTypes = {
  ticketGroupData: PropTypes.objectOf(Object),
};
