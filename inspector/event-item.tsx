import React from 'react';

export const EventItems = (event: Event) =>

  <li key={`${event.type}@${event.timeStamp}`}>{event.type}</li>
