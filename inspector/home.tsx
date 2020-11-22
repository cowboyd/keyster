import React from 'react';
import { Outlet } from 'react-router-dom' ;

import { useSlice } from './hooks';
import { EventFilter } from './event-filter';

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
        {events
          .filter(event => filters[event.type])
          .map(event => (
            <div key={`${event.type}@${event.timeStamp}`}>{event.type}</div>
        ))}
      </section>
      <section id="outlet">
        <Outlet/>
      </section>
    </>
  );
}
