import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  FilterOptions,
  PreCheckout,
  TicketGroupList,
  RedirectModal,
} from './components';
import { EventLayout, Loader } from '_components';
import { getTicketGroupListAction } from '_store/ticketGroupList';
import { setCheckoutTicketEventDataAction } from '_store/checkoutTicket';
import { ajaxGet } from '_helpers/api';
import { navigationHeight } from '_constants';
import { isMobileDevice } from '_helpers';
import { deviceSize } from '_constants';

const LoaderContainer = styled.div`
  display: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 5;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  width: 100%;
  height: calc(100% - ${navigationHeight}px);
  overflow: hidden;

  @media (max-width: ${deviceSize.mobileL}px) {
    flex-flow: column nowrap;
  }
`;

const TicketsContainer = styled.div`
  position: relative;
  width: 320px;
  height: 100%;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.15);
  background-color: white;
  overflow: hidden;

  @media (max-width: ${deviceSize.mobileL}px) {
    order: 2;
    width: 100%;
    min-height: calc(55% - ${navigationHeight}px);
    box-shadow: none;
  }

  ${({ checkout }) =>
    checkout &&
    `
    @media (min-width: ${deviceSize.tablet}px) {
      overflow: hidden;
    }
    `};
`;

const MapContainer = styled.div`
  width: calc(100% - 340px);
  height: calc(100% - 70px - ${navigationHeight}px);
  margin: 10px;

  @media (max-width: ${deviceSize.mobileL}px) {
    width: 100%;
    min-height: calc(45% - ${navigationHeight}px);
    margin: 0px 0px 5px;
  }
`;

export const SeatSelection = ({ eventId }) => {
  const ticketData = useSelector((state) => state.ticketGroupListReducer);
  const checkoutTicket = useSelector((state) => state.checkoutTicketReducer);
  const dispatch = useDispatch();

  const ticketListRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [eventData, setEventData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingFailed, setLoadingfailed] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const seaticsData = await ajaxGet(`maps/${eventId}`, 'jsonp');
        setEventData(await seaticsData[0]);
        setMapData(await seaticsData[1]);
      } catch {
        setLoadingfailed(true);
      }
    };

    const loadSeaticsMapFramework = (callback) => {
      const existingScript = document.getElementById('seaticsMapFramework');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://mapwidget3.seatics.com/api/framework';
        script.id = 'seaticsMapFramework';
        document.body.appendChild(script);

        script.onload = () => {
          if (callback) callback();
        };

        script.onerror = () => {
          console.error('Failed to load seatics map framework api');
        };
      }

      if (existingScript && callback) callback();
    };

    loadSeaticsMapFramework(() => {
      dispatch(getTicketGroupListAction(eventId));
      getData();
    });

    return function cleanup() {
      if (window.Seatics?.MapComponent?.clear) {
        window.Seatics.MapComponent.clear();
        window.Seatics.unbindEvents();
      }
    };
  }, [dispatch, eventId]);

  useEffect(() => {
    const ticketGroups = ticketData.ticketGroupListFormatted;

    if (mapData && eventData && mapContainerRef?.current && ticketGroups) {
      dispatch(
        setCheckoutTicketEventDataAction({
          eventData: {
            ...eventData,
            eventDate: eventData.eventDate.toString(),
          },
          eventId,
        })
      );

      window.Seatics.config.enableLegend = false;
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
      });

      if (isMobileDevice) {
        window.Seatics.config.showResetControl = false;
        window.Seatics.config.showZoomControls = false;
      }

      var mapLoadingListener = (eventType, eventData) => {
        if (eventData === 'FinishedDrawingMap') {
          setLoadingEvent(false);

          // Zoom Controls seem to need to be removed manually
          if (isMobileDevice) {
            const zoom = document.getElementById('venue-map-zoom-controls');
            if (zoom) {
              zoom.parentNode.removeChild(zoom);
            }
          }
        }
      };

      window.Seatics.TrackingEvents.registerEventListener(mapLoadingListener);
      setFilterOptions(window.Seatics.MapComponent.getFilterOptions());
    }
  }, [
    eventId,
    mapData,
    eventData,
    ticketData.ticketGroups,
    ticketData.ticketGroupListFormatted,
    setFilterOptions,
    dispatch,
  ]);

  return (
    <EventLayout>
      {loadingEvent && (
        <LoaderContainer>
          <Loader centered />
          {loadingFailed && <RedirectModal />}
        </LoaderContainer>
      )}
      <Container>
        <TicketsContainer checkout={checkoutTicket.ticketGroupId}>
          <TicketGroupList ref={ticketListRef} />
          <PreCheckout selectedTicketGroup={checkoutTicket.ticketGroupId} />
        </TicketsContainer>
        <FilterOptions
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
        <MapContainer ref={mapContainerRef} />
      </Container>
    </EventLayout>
  );
};

SeatSelection.propTypes = {
  eventId: PropTypes.number,
};
