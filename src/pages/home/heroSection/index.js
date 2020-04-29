import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { HeroCarousel } from '../components/heroCarousel';
import { sportEvents, concertEvents, comedyEvents, broadwayEvents } from './testData';
import { get, post, put, del } from 'helpers'


export const HeroSection = () => {
const [events, setEvents] = useState([]);

    useEffect(() => {
        get("events").then(events => { events = events.filter(event => event.id<11); setEvents(events); console.log(events)})
      }, []);

    return (
        <HeroCarousel events={events}/>
    );
};
