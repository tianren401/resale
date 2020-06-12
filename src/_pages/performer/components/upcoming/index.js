import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';

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
import { useViewport } from '_hooks';
import { deviceSize, colors } from '_constants';
import { searchService } from '_services';

export const Upcoming = ({ events, sendToPage }) => {
  const dateRange = useSelector(({ searchReducer }) => searchReducer.dateRange);
  const searchFilter = useSelector(({ searchReducer }) => searchReducer.date);
  const [includedDays, setIncludedDays] = useState([]);
  const [filteredLocalEvents, setFilteredLocalEvents] = useState([]);
  const [filteredAllEvents, setFilteredAllEvents] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const upcomingLocalEvents = events?.upcomingLocalEvents;
  const allUpcomingEvents = events?.allUpcomingEvents;
  const similarPerformers = events?.similarPerformers;
  const localWeekends =
    upcomingLocalEvents &&
    upcomingLocalEvents.filter(
      (event) =>
        new Date(Date.parse(event.timestamp)).getDay() === 6 ||
        new Date(Date.parse(event.timestamp)).getDay() === 0
    );
  const allWeekends =
    allUpcomingEvents &&
    allUpcomingEvents.filter(
      (event) =>
        new Date(Date.parse(event.timestamp)).getDay() === 6 ||
        new Date(Date.parse(event.timestamp)).getDay() === 0
    );

  const { width } = useViewport();
  const isMobileDevice = width < deviceSize.tablet;

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
    //matching local events to user-selected dates
    if (upcomingLocalEvents && includedDays) {
      filterEvents(
        upcomingLocalEvents,
        includedDays,
        filteredLocalEvents,
        setFilteredLocalEvents
      );
    }
    //matching all events to user selected dates
    if (allUpcomingEvents && includedDays) {
      filterEvents(
        allUpcomingEvents,
        includedDays,
        filteredAllEvents,
        setFilteredAllEvents
      );
    }
  }, [
    upcomingLocalEvents,
    allUpcomingEvents,
    filteredLocalEvents,
    filteredAllEvents,
    dateRange,
    includedDays,
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

  const searchLocation = useSelector(
    ({ searchReducer }) => searchReducer.location
  );

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
                    defaultRefinement={
                      searchLocation || searchService.defaultLocation
                    }
                  />
                </DayPickerRow>
              ) : (
                <DayPickerRow>
                  <TextContainer>
                    <UpcomingText>Upcoming Events</UpcomingText>
                  </TextContainer>
                  <StyledPlaces
                    defaultRefinement={
                      searchLocation || searchService.defaultLocation
                    }
                  />
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
                    ? upcomingLocalEvents
                    : searchFilter === 'weekendsOnly'
                    ? localWeekends
                    : searchFilter === 'date' && hasSearched
                    ? filteredLocalEvents
                    : upcomingLocalEvents
                }
              />

              <CardList
                topOfPage={false}
                sectionTitle="All Events"
                eventArray={
                  searchFilter === 'all'
                    ? allUpcomingEvents
                    : searchFilter === 'weekendsOnly'
                    ? allWeekends
                    : searchFilter === 'date' && hasSearched
                    ? filteredAllEvents
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
          similar={events?.similarPerformers && similarPerformers}
          carouselTitle={
            similarPerformers &&
            similarPerformers[0].performer &&
            'Similar Performers'
          }
        />
      )}
    </ComponentContainer>
  );
};

Upcoming.propTypes = {
  events: PropTypes.object.isRequired,
  sendToPage: PropTypes.func,
  performerId: PropTypes.number,
};
