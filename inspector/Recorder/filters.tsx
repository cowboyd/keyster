import React from 'react';
import { useSlice } from '../hooks';

import './filters.css';

function EventFilter({ eventName }: {eventName: string; }) {
  let [checked, slice] = useSlice<boolean>('filters', eventName);
  return (
    <div className="filter">
      <input type="checkbox" name={eventName} id={eventName} checked={checked} onChange={event => slice.set(event.target.checked)}/>
      <label htmlFor={eventName}>{eventName}</label>
    </div>
  );
};

export function Filters() {
  return (
    <>
      <section className="filters">
        <p className="filter-label">FILTERS</p>
        <div className="filter-box">
          <div className="filter-rows">
            <EventFilter eventName={"keyup"} />
            <EventFilter eventName={"keydown"} />
            <EventFilter eventName={"keypress"} />
          </div>
          <div className="filter-rows">
            <EventFilter eventName={"input"} />
            <EventFilter eventName={"change"} />
            <EventFilter eventName={"focusin"} />
            <EventFilter eventName={"focusout"} />
          </div>
        </div>
      </section>
    </>
  );
}