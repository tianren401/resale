import React from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  setCheckoutTicketDataAction,
  getLockRequestIdAction,
} from '_store/checkoutTicket';

const StyledTicketGroup = styled.tr`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 10%;
  outline: 1px solid #e2e2e2;
  padding: 10px;
`;

const TicketSectionRow = styled.td`
  font-size: 14px;
  font-weight: bold;
`;

const TicketQuantity = styled.td`
  font-size: 12px;
  font-weight: bold;
  color: #757575;
`;

const TicketPrice = styled.button`
  width: 50%;
  text-align: center;
  vertical-align: middle;
  padding: 1vh 1vh;
  cursor: pointer;
  background-color: #c4c4c4;
`;

export const TicketGroup = (props) => {
  const tgData = props.ticketGroupData;
  const checkoutTicket = useSelector((state) => state.checkoutTicketReducer);
  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const dispatch = useDispatch();

  const handleBuyButton = () => {
    const fullTicketData = ticketData.ticketGroupListRaw.find((ticketGroup) => {
      return ticketGroup.exchangeTicketGroupId === tgData.tgID;
    });

    dispatch(
      setCheckoutTicketDataAction({
        ticketGroupID: tgData.tgID,
        ticketGroupQuantity: 2, // hardcoded for testing
        ticketGroupPrice: tgData.tgPrice,
        deliveryTypeId: fullTicketData.nearTerm.nearTermDeliveryMethod.id,
        deliveryTypeName:
          fullTicketData.nearTerm.nearTermDeliveryMethod.description,
        eventId: fullTicketData.eventId,
        lockRequestID: null,
        vfsURL: tgData.section?.vfsUrl,
        section: tgData.tgUserSec,
        row: tgData.tgUserRow,
      })
    );

    dispatch(
      getLockRequestIdAction({
        id: tgData.tgID,
        quantity: 2, // hardcoded for testing
        price: tgData.tgPrice,
      })
    );
  };

  const renderRedirect = () => {
    if (checkoutTicket.lockRequestId) {
      return <Redirect to="/checkout" />;
    }
  };

  return (
    <StyledTicketGroup
      onMouseEnter={() => window.Seatics.MapComponent.highlightTicket(tgData)}
      onMouseLeave={() => window.Seatics.MapComponent.removeHighlight(tgData)}
    >
      <TicketSectionRow>
        {`Section ${tgData.tgUserSec} • Row + ${tgData.tgUserRow}`}
      </TicketSectionRow>
      <TicketQuantity>
        {`${tgData?.tgRange[0]} - ${tgData?.tgRange[1]} Tickets`}
      </TicketQuantity>
      <td>
        <TicketPrice onClick={handleBuyButton}>
          {`$${tgData.tgPrice}`}
        </TicketPrice>
      </td>
      {renderRedirect()}
    </StyledTicketGroup>
  );
};

TicketGroup.propTypes = {
  ticketGroupData: PropTypes.objectOf(Object),
};
