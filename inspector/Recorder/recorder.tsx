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
      <p className="recorder-label">
        RECORDER FIELDS
      </p>
      <form id="event-fields-form">
        <div className="fields-row">
          <div className="textfield">
            <label htmlFor="field1">Text Input (w/ ref)</label>
            <input ref={field1} type="text" id="field1"/>
          </div>
          <div className="textfield">
            <label htmlFor="field2">Text Input (w/o ref)</label>
            <input type="text" id="field2"/>
          </div>
        </div>
        <div className="fields-row">
          <label htmlFor="field3">Text Area</label>
          <textarea id="field3"></textarea>
        </div>
      </form>
      <Filters/>
      <button 
        onClick={() => events.set([])} 
        type="reset" 
        form="event-fields-form"
        className="reset-button"
      >
        RESET
      </button>
    </div>
  );
}
