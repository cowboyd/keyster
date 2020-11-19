import React, { useState, useCallback } from 'react';
import { KeyEventInspector, KeyEventFilter } from './inspector';

function getInitialFilters(): Record<string, boolean> {
  let storedFilters = localStorage.getItem('keyster/filters');
  if (storedFilters) {
    return JSON.parse(storedFilters);
  } else {
    return {
      keydown: true,
      keyup: true,
      keypress: false
    };
  }
}

function setInitialFilters(value: Record<string, boolean>): void {
  localStorage.setItem('keyster/filters', JSON.stringify(value));
}



export function App() {
  let [filters, setFilters] = useState(getInitialFilters());

  let setFilter = useCallback((name: string, value: boolean) => {
    let next = {...filters, [name]: value };
    setInitialFilters(next);
    setFilters(next);
  }, [filters])

  let fns = Object.keys(filters).reduce((fns, key) => {
    let value = filters[key];
    return fns.concat((event: KeyboardEvent) => value ? event.type === key : false);
  }, [] as KeyEventFilter[]);

    return (
        <>
        <section id="filters">
        <h2> Filters </h2>
        <div><input type="checkbox" name="keydown" id="keydown" checked={filters.keydown} onChange={event => setFilter('keydown', event.target.checked)}/><label htmlFor="keydown">keydown</label></div>
        <div><input type="checkbox" name="keyup" id="keyup" checked={filters.keyup} onChange={event => setFilter('keyup', event.target.checked)}/><label htmlFor="keyup">keyup</label></div>
        <div><input type="checkbox" name="keypress" id="keypress" checked={filters.keypress} onChange={event => setFilter('keypress', event.target.checked)}/><label htmlFor="keypress">keypress</label></div>
        </section>
        <section id="inspector">
        <KeyEventInspector filters={fns} />
        </section>
        </>
    );
}
