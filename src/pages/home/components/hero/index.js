import React, { useState, useEffect } from 'react';

import { Carousel } from './carousel';
import { testImages } from './testData';
import { get } from 'helpers'


export const Hero = () => {
  const [events, setEvents] = useState([]);

  // TODO: Pull real events from Redux
  useEffect(() => {
    get("events").then(events => {
      events = events
        .filter((event) => event.id < 10)
        .map((event, index) => ({
          ...event,
          imageSource: testImages[index % testImages.length],
        }));
      setEvents(events);
      console.log(events);
    });
  }, []);

  return (
    <Carousel events={events} />
  );
};
