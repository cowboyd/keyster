import React from 'react';
import { Link, Outlet, useRoutes  } from 'react-router-dom';
import { AtomProvider, useOperation, useSlice, useAtom } from './hooks';
import { spawn } from 'effection';
import { on } from '@effection/events';
import { subscribe } from '@effection/subscription';

/* /* function getInitialFilters(): Record<string, boolean> {
 *  *   let storedFilters = localStorage.getItem('keyster/filters');
 *  *   if (storedFilters) {
 *  *     return JSON.parse(storedFilters);
 *  *   } else {
 *  *     return {
 *  *       keydown: true,
 *  *       keyup: true,
 *  *       keypress: false
 *  *     };
 *  *   }
 *  * }
 *  *
 *  * function setInitialFilters(value: Record<string, boolean>): void {
 *  *   localStorage.setItem('keyster/filters', JSON.stringify(value));
 *  * } */

function EventTypeFilter({ eventName }: {eventName: string; }) {
  let [checked, slice] = useSlice<boolean>('filters', eventName);

  return (
    <div>
      <input type="checkbox" name={eventName} id={eventName} checked={checked} onChange={event => slice.set(event.target.checked)}/>
      <label htmlFor={eventName}>{eventName}</label>
    </div>);
}

function Home() {
  let [events] = useSlice<Event[]>('events');

  let [filters] = useSlice<Record<string, boolean>>('filters');

  return (
    <>
      <section id="filters">
        <h2>Filters</h2>
        <EventTypeFilter eventName={"keydown"} />
        <EventTypeFilter eventName={"keyup"} />
        <EventTypeFilter eventName={"keypress"} />
      </section>
      <section id="events">
        <h2>Events</h2>
        {events
          .filter(event => filters[event.type])
          .map(event => (
          <div key={`${event.type}@${event.timeStamp}`}>{event.type}</div>
        ))}
      </section>
      <section id="outlet">
        <Outlet/>
      </section>
    </>
  );
}

function Record() {
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

function EventsIndex() {
  return (
    <>
      <Link to="record">Record</Link>
    </>
  );
}

export function App() {

  // let [filters, setFilters] = useState(getInitialFilters());

  // let setFilter = useCallback((name: string, value: boolean) => {
  //   let next = {...filters, [name]: value };
  //   setInitialFilters(next);
  //   setFilters(next);
  // }, [filters])

  // let fns = Object.keys(filters).reduce((fns, key) => {
  //   let value = filters[key];
  //   return fns.concat((event: KeyboardEvent) => value ? event.type === key : false);
  // }, [] as KeyEventFilter[]);

  return useRoutes([
    { path: "/", element: <Home />, children: [
      { path: "", element: <EventsIndex /> },
      { path: "record", element: <Record /> }
    ]}
  ]);
}
