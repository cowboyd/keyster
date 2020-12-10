import React from 'react';
import { useRoutes  } from 'react-router-dom';

import { Recorder } from './recorder';
import { Home } from './home';
import { EventsIndex } from './events-index';
import { EventDetails } from './event-details';

export function App() {
  return useRoutes([
    { path: "", element: <Home />, children: [
      { path: "/", element: <EventsIndex /> },
      { path: "/:id", element: <EventDetails /> },
      { path: "/record", element: <Recorder /> }
    ]}
  ]);
}
