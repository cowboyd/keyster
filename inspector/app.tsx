import React from 'react';
import { Link, useRoutes  } from 'react-router-dom';

import { Recorder } from './recorder';
import { Home } from './home';
import { EventsIndex } from './events-index';

export function App() {
  return useRoutes([
    { path: "/", element: <Home />, children: [
      { path: "", element: <EventsIndex /> },
      { path: "record", element: <Recorder /> }
    ]}
  ]);
}
