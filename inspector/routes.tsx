import React from 'react';
import { useRoutes  } from 'react-router-dom';

import { Recorder } from './Recorder/recorder';
import { Home } from './Home/home';
import { EventDetails } from './EventDetails/event-details';

export function Routes() {
  return useRoutes([
    { path: "", element: <Home />, children: [
      { path: "/", element: <Recorder /> },
      { path: "/:id", element: <EventDetails /> }
    ]}
  ]);
}
