import React from 'react';
import { Link } from 'react-router-dom';
import { spawn } from 'effection';
import { on } from '@effection/events';

import { useOperation, useSlice } from './hooks';

export function Recorder() {
  let [,events] = useSlice<Event[]>('events');

  useOperation(function*() {
    events.set([]);
    for (let eventName of ['keydown', 'keyup', 'keypress', 'input', 'change', 'focus']) {
      yield spawn(on<Event[]>(document, eventName).forEach(function* ([event]) {
        events.update(state => state.concat(event));
      }));
    }
    yield;
  });

  return (
    <>
      <Link to="/">Stop</Link>
    </>
  );
}
