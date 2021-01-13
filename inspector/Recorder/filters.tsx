import React from 'react';
import { useSlice } from '../hooks';

import './filters.css';

function EventFilter({ eventName }: {eventName: string; }) {
  let [checked, slice] = useSlice<boolean>('filters', eventName);
  return (
    <div id="filter">
      <input type="checkbox" name={eventName} id={eventName} checked={checked} onChange={event => slice.set(event.target.checked)}/>
      <label htmlFor={eventName}>{eventName}</label>
    </div>
  );
};

export function Filters() {
  return (
    <>
      <section id="filters">
        <span id="filterlabel">FILTERS</span>
        <div id="filterbox">
          <div id="filterrow1">
            <EventFilter eventName={"keyup"} />
            <EventFilter eventName={"keydown"} />
            <EventFilter eventName={"keypress"} />
          </div>
          <div id="filterrow2">
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