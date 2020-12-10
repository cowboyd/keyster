import React from 'react';
import { Link, Outlet } from 'react-router-dom' ;

import { useSlice } from './hooks';
import { EventFilter } from './event-filter';
import { EventItem } from './event-item';

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
        <EventFilter eventName={"focusin"} />
        <EventFilter eventName={"focusout"} />
      </section>
      <section id="events">
        <h2>Events</h2>
        <ul>{
          Object.entries(events)
                .filter(([,event]) => filters[event.type])
                .map(([key, event]) => (
                  <Link key={key} to={key}>
                    <EventItem event={event} />
                  </Link>))
        }
        </ul>
      </section>
      <section id="outlet">
        <Outlet/>
      </section>
    </>
  );
}
