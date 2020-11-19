import React, { useEffect, useState } from 'react';

import { ObjectInspector, ObjectLabel, ObjectRootLabel } from 'react-inspector';

const nodeRenderer = ({ depth, name, data, isNonenumerable, expanded }) => {
  if (depth === 0) {
    return <ObjectRootLabel name={name} data={data} />
  } else if (data.type) {
    return <ObjectLabel name={data.type} data={data} isNonenumerable={isNonenumerable} />;
  } else  {
    return <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />;
  }
}

export interface KeyEventFilter {
  (event: KeyboardEvent): boolean;
}

interface KeyEventInspectorProps {
  filters: KeyEventFilter[];
}

export function KeyEventInspector({ filters }: KeyEventInspectorProps) {
  let [events, setEvents] = useState<object[]>([]);

  useEffect(() => {
    function pushEvent(event: Event) {
      setEvents(events.concat([toJSON(event as KeyboardEvent)]));
    }
    let bindings: Function[] = [];
    for (let eventName of ['keydown', 'keyup', 'keypress']) {
      document.addEventListener(eventName, pushEvent);
      bindings.push(() => document.removeEventListener(eventName, pushEvent));
    }
    return () => bindings.forEach(release => release());
  }, [events]);

  return (<ObjectInspector
          data={events.filter((e) => filters.some(f => f(e as KeyboardEvent)))}
          name={"events"}
          expandLevel={1}
          nodeRenderer={nodeRenderer}
          />);
}

function toJSON(event: KeyboardEvent) {
  let {
    //KeyboardEvent
    altKey,
    code,
    ctrlKey,
    isComposing,
    key,
    location,
    metaKey,
    repeat,
    shiftKey,

    //UIEvent
    cancelBubble,
    detail,
    // view,

    //Event
    bubbles,
    cancelable,
    composed,
    defaultPrevented,
    eventPhase,
    timeStamp,
    type,
    isTrusted
  } = event;

  return {
    //KeyboardEvent
    altKey,
    code,
    ctrlKey,
    isComposing,
    key,
    location,
    metaKey,
    repeat,
    shiftKey,

    //UIEvent
    cancelBubble,
    detail,
    // view,

    //Event
    bubbles,
    cancelable,
    composed,
    defaultPrevented,
    eventPhase,
    timeStamp,
    type,
    isTrusted,

    // make output better
    constructor: { name: keyname(event) }
  }
}

function keyname(event: KeyboardEvent) {
  if (event.type === 'keyup') {
    return `${event.key}⬆`;
  } else if (event.type === 'keydown') {
    return `${event.key}⬇`;
  } else {
    return event.key;
  }
}
