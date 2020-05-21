import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ajaxGet } from '../../_helpers/api';
import { getTicketGroupListAction } from '_store/ticketGroupList';
import { Header } from './components/header';
import { TicketList } from './components/ticketList';
import { FilterOptions } from './components/filterOptions';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  align-items: center;
`;

const MapFilter = styled.div`
  height: 100%;
  width: 80%;
  height: 100%;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 80%;
`;

export const SeatSelection = (props) => {
  const eventId = props.match.params.eventId;

  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const dispatch = useDispatch();

  const ticketListRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const [eventData, setEventData] = React.useState(null);
  const [mapData, setMapData] = React.useState(null);
  const [filterOptions, setFilterOptions] = React.useState(null);

  useEffect(() => {
    dispatch(getTicketGroupListAction(eventId));
    const getData = async () => {
      const seaticsData = await ajaxGet(`maps/${eventId}`, 'jsonp');
      setEventData(await seaticsData[0]);
      setMapData(await seaticsData[1]);
    };
    getData();
  }, [dispatch, eventId]);

  useEffect(() => {
    const ticketGroups = ticketData.ticketGroupListFormatted;

    if (mapData && eventData && mapContainerRef?.current && ticketGroups) {
      window.Seatics.MapComponent.create({
        imgSrc: eventData.mapImage,
        tickets: ticketGroups,
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

      setFilterOptions(window.Seatics.MapComponent.getFilterOptions());
    }
  }, [
    mapData,
    ticketData.ticketGroups,
    eventData,
    setFilterOptions,
    ticketData.ticketGroupListFormatted,
  ]);

  return (
    <Container>
      <Header event={eventData} />
      <TicketList ref={ticketListRef} />
      <MapFilter>
        <FilterOptions
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
        <MapContainer ref={mapContainerRef} />
      </MapFilter>
    </Container>
  );
};

SeatSelection.propTypes = {
  match: PropTypes.objectOf(Object),
};
