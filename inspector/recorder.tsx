import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { spawn, timeout } from 'effection';
import { on, once } from '@effection/events';

import { useOperation, useSlice } from './hooks';

export function Recorder() {
  let [,events] = useSlice<Event[]>('events');

  let field1 = useRef(null);

  useOperation(function*() {
    events.set([]);

    while (!field1.current) {
      yield timeout(1);
    }

    field1.current.focus();

    for (let eventName of ['keydown', 'keyup', 'keypress', 'input', 'change', 'focusin', 'focusout']) {
      yield spawn(on<Event[]>(document, eventName).forEach(function* ([event]) {

        events.update(state => state.concat(event));
      }));
    }
    yield;
  });

  return (
    <>
      <Link to="/">Stop</Link>

      <form>
        <p>
          Play around with these fields to see the sequences of events that the browser emits
        </p>
        <fieldset>
          <label htmlFor="field1">Field 1</label>
          <input ref={field1} type="text" id="field1"/>
        </fieldset>
        <fieldset>
          <label htmlFor="field2">Field 2</label>
        <input type="text" id="field2"/>
        </fieldset>
        <fieldset>
        <label htmlFor="field3">Field 3</label>
        <textarea id="field3"></textarea>
        </fieldset>
      </form>
    </>
  );
}
