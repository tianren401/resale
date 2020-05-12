import React from 'react';
import PropTypes from 'prop-types';
import { ajaxGet } from '../../_helpers/api';
import { TicketList } from './components/ticketList';

export const SeatSelection = (props) => {
  const eventId = props.match.params.eventId;

  const ticketListRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const [eventData, setEventData] = React.useState(null);
  const [mapData, setMapData] = React.useState(null);
  const [ticketData, setTicketData] = React.useState([]);

  const formatTicketData = (initialData) => {
    const formattedTicketData = [];

    initialData.ticketGroups.forEach((ticketGroup) => {
      formattedTicketData.push({
        tgUserSec: ticketGroup.seats.section,
        tgUserRow: ticketGroup.seats.row,
        tgQty: ticketGroup.availableQuantity,
        tgPrice: ticketGroup.unitPrice.wholesalePrice.value,
        tgID: ticketGroup.exchangeTicketGroupId,
        tgType: ticketGroup.ticketGroupType.id,
        tgNotes: ticketGroup.notes,
        tgUserSeats: `${ticketGroup.seats.lowSeat}-${ticketGroup.seats.highSeat}`,
        tgDeliveryOptions: '', // TODO: Add in after filtering out FedEx
        tgSplitRuleId: 1,
      });
    });

    return formattedTicketData;
  };

  const buildMap = () => {
    if (mapData && eventData && mapContainerRef?.current && ticketData) {
      window.Seatics.MapComponent.create({
        imgSrc: eventData.mapImage,
        tickets: ticketData,
        mapData: mapData,
        vfsUrl: 'https://vfs.seatics.com',
        container: window.jQuery(mapContainerRef.current),
        presentationInterface: {
          updateTicketsList: (ticketDataSegmented) => {
            ticketListRef.current.updateTicketDataSegmented(
              ticketDataSegmented
            );
          },
        },
        mapWidth: 525,
        mapHeight: 545,
        mapName: eventData.mapName,
        enableSectionInfoPopups: true,
      });

      window.Seatics.MapComponent.onTicketListDrawn();
    }
  };

  const getData = async () => {
    const seaticsData = await ajaxGet(`maps/${eventId}`, 'jsonp');
    const ticketData = await ajaxGet(`ticketgroups/${eventId}`, 'json');

    setEventData(await seaticsData[0]);
    setMapData(await seaticsData[1]);
    setTicketData(await formatTicketData(ticketData));
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    buildMap();
  }, [getData]);

  return (
    <div>
      <h1>Seat Selection</h1>
      <div style={{ width: '100%' }}>
        <div style={{ width: '35%', height: '800px', float: 'left' }}>
          <TicketList ref={ticketListRef} />
        </div>
        <div
          ref={mapContainerRef}
          style={{ width: '65%', height: '800px', float: 'left' }}
        />
      </div>
    </div>
  );
};

SeatSelection.propTypes = {
  match: PropTypes.objectOf(Object),
};
