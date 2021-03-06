import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useSlice } from '../hooks';

import {
  isInputEvent,
  isKeyboardEvent,
  isChangeEvent
} from "../event-utils";

import './details.css';

export function EventDetails() {
  let { id } = useParams()
  let [events] = useSlice<Record<string,UIEvent>>('events');

  let json = useMemo(() => {
    let event = events[id];
    if (!event) {
      return '{}';
    } else {
      return JSON.stringify(serialize(event), null, 2);
    }
  }, [id, events]);

  return (
    <div className="details">
      { !event ? <p>No event found with id: {id} </p> :
        <SyntaxHighlighter key={id} language="json" style={dark}>
          {json}
        </SyntaxHighlighter>
      }
      <Link to="/">
        <button>
          RETURN ⏎
        </button>
      </Link>
    </div>
  );
};

function serialize(event: UIEvent): Record<string, unknown> {
  let { type  } = event;
  let {
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
    isTrusted
  } = event;

  let uiAttrs = {
    cancelBubble,
    detail,
    bubbles,
    cancelable,
    composed,
    defaultPrevented,
    eventPhase,
    timeStamp,
    isTrusted
  };

  if (isKeyboardEvent(event)) {
    let {
      //KeyboardEvent
      altKey,
      code,
      keyCode,
      ctrlKey,
      isComposing,
      key,
      location,
      metaKey,
      repeat,
      shiftKey
    } = event;

    let keyAttrs = {
      //KeyboardEvent
      altKey,
      code,
      keyCode,
      ctrlKey,
      isComposing,
      key,
      location,
      metaKey,
      repeat,
      shiftKey
    };
    return { type, ...keyAttrs, ...uiAttrs };
  } else if (isInputEvent(event)) {
    let {
      data,
      dataTransfer,
      inputType,
      isComposing
    } = event;

    return {
      type,
      data,
      dataTransfer,
      inputType,
      isComposing,
      target: event.target.id || event.target.type,
      ...uiAttrs
    };
  } else if (isChangeEvent(event)) {
    return {
      type,
      target: event.target.id || event.target.type,
      ...uiAttrs
    }
  } else {
    return { type, ...uiAttrs };
  }
}
