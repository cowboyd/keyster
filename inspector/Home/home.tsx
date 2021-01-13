import React from 'react';
import { Link, Outlet } from 'react-router-dom' ;

import { useSlice } from '../hooks';
import { EventItem } from './event-item';

import './home.css';

export function Home() {
  let [events] = useSlice<Event[]>('events');

  let [filters] = useSlice<Record<string, boolean>>('filters');

  return (
    <>
      <section id="inlet">
        <Outlet/>
      </section>
      <section id="outlet">
        <ul>{
          Object.entries(events)
                .filter(([,event]) => filters[event.type])
                .slice(0)
                .reverse()
                .map(([key, event]) => (
                  <Link key={key} to={key}>
                    <EventItem event={event} />
                  </Link>))}
        </ul>
      </section>
    </>
  );
}
