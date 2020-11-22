import React from 'react';
import { useSlice } from './hooks';

export function EventFilter({ eventName }: {eventName: string; }) {
  let [checked, slice] = useSlice<boolean>('filters', eventName);

  return (
    <div>
      <input type="checkbox" name={eventName} id={eventName} checked={checked} onChange={event => slice.set(event.target.checked)}/>
      <label htmlFor={eventName}>{eventName}</label>
    </div>);
}
