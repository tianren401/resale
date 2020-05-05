import React, { useState, useEffect } from 'react';

import { Carousel } from './carousel';
import { get } from '_helpers';

import broadwayEvent11 from '_images/mocks/broadwayEvent11.png';
import broadwayEvent12 from '_images/mocks/broadwayEvent12.png';
import broadwayEvent13 from '_images/mocks/broadwayEvent13.png';
import broadwayEvent14 from '_images/mocks/broadwayEvent14.png';

export const Hero = () => {
  const [events, setEvents] = useState([]);

  const testImages = [broadwayEvent11, broadwayEvent12, broadwayEvent13, broadwayEvent14];

  // TODO: Pull real events from Redux
  useEffect(() => {
    get('events').then((events) => {
      events = events
        .filter((event) => event.id < 10)
        .map((event, index) => ({
          ...event,
          imageSource: testImages[index % testImages.length],
        }));
      setEvents(events);
      console.log(events);
    });
  }, [testImages]);

  return <Carousel events={events} />;
};
