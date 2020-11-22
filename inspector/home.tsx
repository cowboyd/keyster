import React from 'react';
import { Outlet } from 'react-router-dom' ;

import { useSlice } from './hooks';
import { EventFilter } from './event-filter';
import { EventItems } from './event-item';

export function Home() {
  let [events] = useSlice<Event[]>('events');

  let [filters] = useSlice<Record<string, boolean>>('filters');

  return (
    <>
      <section id="filters">
        <h2>Filters</h2>
        <EventFilter eventName={"keydown"} />
        <EventFilter eventName={"keyup"} />
        <EventFilter eventName={"keypress"} />
        <EventFilter eventName={"input"} />
        <EventFilter eventName={"change"} />
        <EventFilter eventName={"focus"} />
      </section>
      <section id="events">
        <h2>Events</h2>
        <ul>
        {events
          .filter(event => filters[event.type])
          .map(EventItems)}
        </ul>
      </section>
      <section id="outlet">
        <Outlet/>
      </section>
    </>
  );
}
