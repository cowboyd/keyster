import React, { useRef } from 'react';

import { spawn, timeout } from 'effection';
import { on } from '@effection/events';
import { Filters } from './filters';

import { useOperation, useSlice } from '../hooks';

import './recorder.css'

export function Recorder() {
  let [,events] = useSlice<Event[]>('events');

  let field1 = useRef<HTMLInputElement | null>(null);

  useOperation(function*() {
    while (!field1.current) {
      yield timeout(1);
    }

    field1.current?.focus();

    for (let eventName of ['keydown', 'keyup', 'keypress', 'input', 'change', 'focusin', 'focusout']) {
      yield spawn(on<Event[]>(document, eventName).forEach(function* ([event]) {
        events.update(state => ({
          ...state,
          [`${event.type}@${event.timeStamp}`]: event
        }));
      }));
    }
    yield;
  });

  return (
    <div id="recorder">
      <form id="event-fields-form">
        <p>
          Play around with these fields to see the sequences of events that the browser emits
        </p>
        <fieldset>
          <label htmlFor="field1">Input Text (w/ ref)</label>
          <input ref={field1} type="text" id="field1"/>
        </fieldset>
        <fieldset>
          <label htmlFor="field2">Input Text (w/o ref)</label>
          <input type="text" id="field2"/>
        </fieldset>
        <fieldset>
          <label htmlFor="field3">TextArea</label>
          <textarea id="field3"></textarea>
        </fieldset>
      </form>
      <Filters/>
      <button 
        onClick={() => events.set([])} 
        type="reset" 
        form="event-fields-form"
        id="resetbutton"
      >
        RESET
      </button>
    </div>
  );
}
