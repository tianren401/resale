import React from 'react';
import { fetchSearch } from 'services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'components';
import SearchBar from 'components/SearchBar';
import { UpcomingSection } from './upcomingSection';
import { EventsGroup } from './eventsGroupSection';
import { upcomingEvents, trendingEvents } from '../../mocks/events';
import { setEventTypeAction } from 'store/homepage';

export const Home = () => {
  const eventType = useSelector(
    ({ homepageReducer }) => homepageReducer.eventType
  );

  const dispatch = useDispatch();
  const changeType = (type) => {
    dispatch(setEventTypeAction(type));
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(197.56deg, #455FE5 -5.72%, #8245E5 37.62%, #FFFFFF 78.06%)',
      }}
    >
      <Container>
        <SearchBar fetchData={fetchSearch} onChange={() => {}} />
      </Container>
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
