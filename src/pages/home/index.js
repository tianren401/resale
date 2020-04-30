import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UpcomingSection } from './upcomingSection';
import { EventsGroup } from './eventsGroupSection';
import { Hero } from './components/hero';
import { upcomingEvents, trendingEvents } from '../../mocks/events';
import { setEventTypeAction } from 'store/homepage';

export const Home = () => {
  const eventType = useSelector(({ homepageReducer }) => homepageReducer.eventType);

  const dispatch = useDispatch();
  const changeType = (type) => {
    dispatch(setEventTypeAction(type));
  };

  return (
    <div
      style={{
        background: 'linear-gradient(197.56deg, #455FE5 -5.72%, #8245E5 37.62%, #FFFFFF 78.06%)',
      }}
    >
      <Hero />
      <EventsGroup
        events={trendingEvents}
        gutter={20}
        changeType={changeType}
        eventType={eventType}
      />
      <UpcomingSection events={upcomingEvents} />
    </div>
  );
};

