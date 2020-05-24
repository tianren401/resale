import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';

import { isMobileDevice } from '_helpers';
import { deviceSize } from '_constants';
import locationPin from '_images/locationPin.png';
import { TabbedContent } from '_components/tabbedContent';
import {
  EventCard,
  EventList,
  LoadMoreButton,
  PerformerDayPicker,
  PerformerModal,
} from '_components';
import { Faq } from '../faq';
import { UpcomingFromOther } from '../upcomingFromOther';

const ComponentContainer = styled.div`
  width: 100%;
  background-color: white;
`;

const DayPickerRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 50px auto 10px auto;
  padding: 20px;
`;

const UpcomingText = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

const LocationText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 20px;
  color: #8d8d94;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

const ColoredLocationText = styled.span`
  color: #511ad1;
  margin-left: 5px;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

const AllEventsText = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  justify-content: flex-start;
  margin: 50px auto 10px auto;
  padding: 20px;
`;

const LocationInput = styled.input`
  font-size: 18px;
  line-height: 22px;
  border: 1px solid #e6e6eb;
  border-radius: 6px;
  text-align: center;
  padding: 15px;
  background-image: url(${locationPin});
  background-repeat: no-repeat;
  background-position: 10% 50%;
`;

const NoEventsFound = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 20px;
  color: #8d8d94;
  text-align: center;

  @media (max-width: ${deviceSize.tablet}px) {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`;

const MobileDayPicker = styled((props) => <PerformerDayPicker {...props} />)``;

const LocationRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Upcoming = ({ events, sendToPage, venueId }) => {
  const upcomingLocalEvents = events?.upcomingLocalEvents;
  const allUpcomingEvents = events?.allUpcomingEvents;
  const similarPerformers = events?.similarPerformers;
  const similarVenues = events?.similarVenues;
  const [selectedDates, setSelectedDates] = useState([]);
  const [filteredAllEvents, setFilteredAllEvents] = useState([]);
  const [filteredLocalEvents, setFilteredLocalEvents] = useState([]);
  const [count, setCount] = useState(0);
  const getSelectedDates = useCallback(
    (dates) => {
      setSelectedDates(dates);
      setCount(count + 1);
    },
    [count]
  );

  const removeDuplicates = (array) => {
    return array.filter((item, index) => {
      return array.indexOf(item) >= index;
    });
  };

  useEffect(() => {
    if (upcomingLocalEvents && selectedDates) {
      getSelectedDates();
      setFilteredLocalEvents([]);
      for (let i = 0; i < upcomingLocalEvents.length; i++) {
        const evaluatedEvent = upcomingLocalEvents[i];
        const parsedDate = Date.parse(evaluatedEvent.timestamp);
        const newDate = new Date(parsedDate);
        const day = newDate.getDate();
        const month = newDate.getMonth();
        const year = newDate.getFullYear();

        for (let j = 0; j < selectedDates.length; j++) {
          const selectedParsedDate = Date.parse(selectedDates[j]);
          const selectedNewDate = new Date(selectedParsedDate);
          const selectedDay = selectedNewDate.getDate();
          const selectedMonth = selectedNewDate.getMonth();
          const selectedYear = selectedNewDate.getFullYear();
          if (
            selectedDay === day &&
            selectedMonth === month &&
            selectedYear === year
          ) {
            filteredLocalEvents.push(upcomingLocalEvents[i]);
            setFilteredLocalEvents(filteredLocalEvents);
          }
        }
      }
    }

    if (allUpcomingEvents && selectedDates) {
      getSelectedDates();
      setFilteredAllEvents([]);
      for (let i = 0; i < allUpcomingEvents.length; i++) {
        const evaluatedEvent = allUpcomingEvents[i];
        const parsedDate = Date.parse(evaluatedEvent.timestamp);
        const newDate = new Date(parsedDate);
        const day = newDate.getDate();
        const month = newDate.getMonth();
        const year = newDate.getFullYear();

        for (let j = 0; j < selectedDates.length; j++) {
          const selectedParsedDate = Date.parse(selectedDates[j]);
          const selectedNewDate = new Date(selectedParsedDate);
          const selectedDay = selectedNewDate.getDate();
          const selectedMonth = selectedNewDate.getMonth();
          const selectedYear = selectedNewDate.getFullYear();
          if (
            selectedDay === day &&
            selectedMonth === month &&
            selectedYear === year
          ) {
            filteredAllEvents.push(allUpcomingEvents[i]);
            setFilteredAllEvents(filteredAllEvents);
          }
        }
      }
    }
  }, [
    allUpcomingEvents,
    filteredAllEvents,
    filteredLocalEvents,
    upcomingLocalEvents,
    getSelectedDates,
    selectedDates,
  ]);

  const [selectedTab, setSelectedTab] = useState(0);

  const getSelectedTab = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (state) => {
    setModalOpen(state);
    sendToPage(state);
  };

  return (
    <ComponentContainer>
      {modalOpen ? (
        <PerformerModal
          sendStateFromModal={setModalOpen}
          sendDaysFromModal={getSelectedDates}
        />
      ) : (
        <EventList>
          <TabbedContent sendToPerformerSection={getSelectedTab} />
          {selectedTab === 1 ? (
            <Faq />
          ) : (
            <>
              {isMobileDevice && (
                <LocationRow>
                  <MobileDayPicker
                    sendToPerformerSection={getSelectedDates}
                    onClick={() => handleModalOpen(!modalOpen)}
                  />
                  <LocationInput value="Location" />
                </LocationRow>
              )}
              <DayPickerRow>
                <UpcomingText>Upcoming Events</UpcomingText>
                {!isMobileDevice && (
                  <PerformerDayPicker
                    sendToPerformerSection={getSelectedDates}
                  />
                )}
              </DayPickerRow>
              {!venueId && (
                <LocationText>
                  Events near
                  <ColoredLocationText>Dallas, TX</ColoredLocationText>
                </LocationText>
              )}

              {!venueId ? (
                upcomingLocalEvents?.length && count < 2 ? (
                  upcomingLocalEvents.map((event) => {
                    return (
                      <EventCard
                        event={event}
                        key={event.id}
                        timestamp={event.timestamp}
                        name={event.name}
                        venueName={event.venue.name}
                        venueState={event.venue.state}
                      />
                    );
                  })
                ) : removeDuplicates(filteredLocalEvents)?.length &&
                  count >= 2 ? (
                  removeDuplicates(filteredLocalEvents).map((event) => {
                    return (
                      <EventCard
                        event={event}
                        key={event.id}
                        timestamp={event.timestamp}
                        name={event.name}
                        venueName={event.venue.name}
                        venueState={event.venue.state}
                      />
                    );
                  })
                ) : upcomingLocalEvents?.length === 0 ? (
                  <NoEventsFound>No upcoming local events found</NoEventsFound>
                ) : (
                  <NoEventsFound>No events found</NoEventsFound>
                )
              ) : (
                venueId &&
                (allUpcomingEvents?.length && count < 2 ? (
                  allUpcomingEvents.map((event) => {
                    return (
                      <EventCard
                        event={event}
                        key={event.id}
                        timestamp={event.timestamp}
                        name={event.name}
                        venueName={event.venue.name}
                        venueState={event.venue.state}
                      />
                    );
                  })
                ) : venueId && count > 0 && filteredAllEvents?.length ? (
                  removeDuplicates(filteredAllEvents).map((event) => {
                    return (
                      <EventCard
                        event={event}
                        key={event.id}
                        timestamp={event.timestamp}
                        name={event.name}
                        venueName={event.venue.name}
                        venueState={event.venue.state}
                      />
                    );
                  })
                ) : filteredAllEvents?.length === 0 ? (
                  <NoEventsFound>No events found</NoEventsFound>
                ) : (
                  <NoEventsFound>No upcoming events found</NoEventsFound>
                ))
              )}

              {!venueId && <AllEventsText>All Events</AllEventsText>}

              {!venueId && allUpcomingEvents && count < 2 ? (
                allUpcomingEvents.map((event) => {
                  return (
                    <EventCard
                      event={event}
                      key={event.id}
                      timestamp={event.timestamp}
                      name={event.name}
                      venueName={event.venue.name}
                      venueState={event.venue.state}
                    />
                  );
                })
              ) : filteredAllEvents.length === 0 && !venueId ? (
                <NoEventsFound>No events found</NoEventsFound>
              ) : (
                !venueId &&
                removeDuplicates(filteredAllEvents).map((event) => {
                  return (
                    <EventCard
                      event={event}
                      key={event.id}
                      timestamp={event.timestamp}
                      name={event.name}
                      venueName={event.venue.name}
                      venueState={event.venue.state}
                    />
                  );
                })
              )}
            </>
          )}
          {isMobileDevice && <LoadMoreButton />}
        </EventList>
      )}
      {selectedTab !== 1 && !modalOpen && (
        <UpcomingFromOther
          similar={
            events?.similarPerformers ? similarPerformers : similarVenues
          }
        />
      )}
    </ComponentContainer>
  );
};

Upcoming.propTypes = {
  events: PropTypes.object,
  sendToPage: PropTypes.func,
  venueId: PropTypes.number,
};
