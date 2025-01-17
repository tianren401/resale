import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';

import { isMobileDevice } from '_helpers';
import { TabbedContent } from '_components/tabbedContent';
import {
  EventList,
  CardList,
  LoadMoreButton,
  PerformerModal,
  Faq,
} from '_components';
import { UpcomingFromOther } from '../upcomingFromOther';
import {
  ComponentContainer,
  DayPickerRow,
  UpcomingText,
  TextContainer,
  StyledDateRangeDropdown,
  StyledPlaces,
} from './styledComponents';
import { colors } from '_constants';

export const Upcoming = ({ events, sendToPage }) => {
  const dateRange = useSelector(({ searchReducer }) => searchReducer.dateRange);
  const searchFilter = useSelector(({ searchReducer }) => searchReducer.date);
  const [includedDays, setIncludedDays] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const allUpcomingEvents = events?.allUpcomingEvents;
  const similarVenues = events?.similarVenues;
  const weekends =
    allUpcomingEvents &&
    allUpcomingEvents.filter(
      (event) =>
        new Date(Date.parse(event.timestamp)).getDay() === 6 ||
        new Date(Date.parse(event.timestamp)).getDay() === 0
    );

  useEffect(() => {
    //checking if filtered events already match the input date range
    const areArraysEqual = (arrayOne, arrayTwo) => {
      return arrayOne.join('') === arrayTwo.join('');
    };
    //getting dates between start and end dates selected
    const getIncludedDays = (startDate, endDate) => {
      setHasSearched(true);
      var dates = [],
        currentDate = startDate,
        addDays = function (days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate = addDays.call(currentDate, 1);
      }
      if (areArraysEqual(dates, includedDays)) {
        return;
      } else {
        setIncludedDays(dates);
      }
    };
    //iterating through all events of a kind and only setting state array to ones that match dates
    const filterEvents = (eventArray, dayArray, filteredArray, setFunction) => {
      const filteredEvents = eventArray.filter((event) => {
        const parsedDate = Date.parse(event.timestamp);
        const newDate = new Date(parsedDate);
        const eventDay = newDate.getDate();
        const eventMonth = newDate.getMonth();
        const eventYear = newDate.getFullYear();

        const matchingDay = dayArray.find((day) => {
          const selectedParsedDate = Date.parse(day);
          const selectedNewDate = new Date(selectedParsedDate);
          const selectedDay = selectedNewDate.getDate();
          const selectedMonth = selectedNewDate.getMonth();
          const selectedYear = selectedNewDate.getFullYear();
          if (
            selectedDay === eventDay &&
            selectedMonth === eventMonth &&
            selectedYear === eventYear
          ) {
            return true;
          }
          return false;
        });

        if (matchingDay) return true;
        return false;
      });

      if (areArraysEqual(filteredEvents, filteredArray)) {
        return;
      }
      return setFunction(filteredEvents);
    };
    //updating user-selected days
    dateRange && getIncludedDays(dateRange.start, dateRange.end);

    //matching all events to user selected dates
    if (allUpcomingEvents && includedDays) {
      filterEvents(
        allUpcomingEvents,
        includedDays,
        filteredEvents,
        setFilteredEvents
      );
    }
  }, [allUpcomingEvents, filteredEvents, dateRange, includedDays]);

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
        <PerformerModal sendStateFromModal={setModalOpen} />
      ) : (
        <EventList>
          <TabbedContent sendToPerformerSection={getSelectedTab} />
          {selectedTab === 1 ? (
            <Faq />
          ) : (
            <>
              {isMobileDevice ? (
                <DayPickerRow>
                  <StyledDateRangeDropdown
                    onClick={() => handleModalOpen(!modalOpen)}
                    datesSearched={dateRange && colors.brand}
                  />
                  <StyledPlaces
                    defaultRefinement={{
                      latitude: 32.8203525,
                      longitude: -97.011731,
                    }}
                  />
                </DayPickerRow>
              ) : (
                <DayPickerRow>
                  <TextContainer>
                    <UpcomingText>Upcoming Events</UpcomingText>
                  </TextContainer>
                  <StyledDateRangeDropdown
                    datesSearched={dateRange && colors.brand}
                  />
                </DayPickerRow>
              )}

              <CardList
                topOfPage={true}
                sectionTitle="Upcoming Events"
                eventArray={
                  searchFilter === 'all'
                    ? allUpcomingEvents
                    : searchFilter === 'weekendsOnly'
                    ? weekends
                    : searchFilter === 'date' && hasSearched
                    ? filteredEvents
                    : allUpcomingEvents
                }
              />
            </>
          )}
          {isMobileDevice && <LoadMoreButton />}
        </EventList>
      )}
      {selectedTab !== 1 && !modalOpen && (
        <UpcomingFromOther
          similar={events?.similarVenues && similarVenues}
          carouselTitle={
            similarVenues && similarVenues[0].venue && 'Similar Venues'
          }
        />
      )}
    </ComponentContainer>
  );
};

Upcoming.propTypes = {
  events: PropTypes.object.isRequired,
  sendToPage: PropTypes.func,
  venueId: PropTypes.number,
};
