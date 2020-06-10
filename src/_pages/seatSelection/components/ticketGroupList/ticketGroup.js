import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  StyledTicketGroup,
  TicketInformation,
  TicketSectionRow,
  TicketQuantity,
  TicketPriceButton,
} from './styledComponents';
import { setPreCheckoutTicketDataAction } from '_store/checkoutTicket';
import vfsPlaceHolder from '_images/vfsPlaceHolder.svg';

export const TicketGroup = ({
  ticketGroupData,
  vfsImage,
  setVFSImage,
  setSeatMessage,
  isOnMap,
}) => {
  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    window.Seatics.MapComponent.highlightTicket(ticketGroupData);
    if (!vfsImage) {
      return;
    }

    if (!ticketGroupData.section) {
      setSeatMessage('No seat preview available');
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
        ticketGroupId: ticketGroupData.tgID,
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
      isOnMap={isOnMap}
    >
      <TicketInformation>
        <TicketSectionRow>
          Section {ticketGroupData.tgUserSec} • Row {ticketGroupData.tgUserRow}
        </TicketSectionRow>
        <TicketQuantity>
          {ticketGroupData?.tgRange[0]} - {ticketGroupData?.tgRange[1]} Tickets
        </TicketQuantity>
      </TicketInformation>
      <TicketPriceButton
        buttonSize="small"
        minWidth={'85px'}
        fontWeight={'600'}
        onClick={handleBuyButton}
      >
        ${ticketGroupData.tgPrice}/ea
      </TicketPriceButton>
    </StyledTicketGroup>
  );
};

TicketGroup.propTypes = {
  ticketGroupData: PropTypes.objectOf(Object),
  setVFSImage: PropTypes.any,
  vfsImage: PropTypes.any,
  setSeatMessage: PropTypes.any,
  isOnMap: PropTypes.bool,
};
