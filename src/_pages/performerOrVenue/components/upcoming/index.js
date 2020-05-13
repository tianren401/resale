import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import downArrow from '_images/downArrow.svg';
import { TabbedContent } from '_components/tabbedContent';
import { EventCard, EventList } from '_components';
import { Faq } from '../faq';

const ComponentContainer = styled.div`
  width: 100%;
  background-color: white;
`;

const DayPickerRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 50px auto 10px auto;
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
`;

const ColoredLocationText = styled.span`
  color: #511ad1;
  margin-left: 5px;
`;

const AllEventsText = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  display: flex;
  justify-content: flex-start;
  margin: 50px auto 10px auto;
`;

const DayPickerContainer = styled.div`
  > .DayPickerInput {
    > input {
      text-align: center;
      border: 1px solid #c4c4c4;
      border-radius: 8px;
      cursor: pointer;
      width: 80%;
      padding: 5px;
      background-image: url(${downArrow});
      background-repeat: no-repeat;
      background-position: right center;
    }
  }
`;

export const Upcoming = ({ events }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dayPicked, setDayPicked] = useState({
    selectedDay: null,
    isEmpty: null,
    isValidDay: null,
    isDisabled: null,
  });

  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    setDayPicked({
      ...dayPicked,
      selectedDay,
      isEmpty: !input.value.trim(),
      isValidDay: typeof selectedDay !== 'undefined',
      isDisabled: modifiers.disabled === true,
    });
  };

  const getSelectedTab = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  return (
    <ComponentContainer>
      <EventList>
        <TabbedContent sendToPerformerSection={getSelectedTab} />
        {selectedTab === 1 ? (
          <Faq />
        ) : (
          <>
            <DayPickerRow>
              <UpcomingText>Upcoming Concerts</UpcomingText>
              <DayPickerContainer>
                <DayPickerInput
                  placeholder="Pick Date"
                  value="Pick Date"
                  onDayChange={handleDayChange}
                  selectedDay={dayPicked.selectedDay}
                />
              </DayPickerContainer>
            </DayPickerRow>
            <LocationText>
              Concerts near
              <ColoredLocationText>Philadelphia, PA</ColoredLocationText>
            </LocationText>

            {events &&
              events.map((event) => {
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
              })}

            <AllEventsText>All concerts</AllEventsText>

            {events &&
              events.map((event) => {
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
              })}
          </>
        )}
      </EventList>
    </ComponentContainer>
  );
};

Upcoming.propTypes = {
  events: PropTypes.array,
};
