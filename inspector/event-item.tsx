import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard,
         faWaveSquare,
         faSearch,
         faArrowCircleUp,
         faArrowCircleDown,
         faArrowCircleRight,
         faQuestionCircle,
         faArrowDown,
         faArrowUp,
         faArrowRight,
         faArrowLeft,
         faCircle,
         faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

import {
  isKeyboardEvent,
  isInputEvent,
  isChangeEvent,
  isFocusEvent
} from './event-utils';

export function EventItem({ event }: { event: Event }) {
  let element = getElement(event);
  return <li className={"event-item"}>{element}</li>
}

function getElement(event: Event) {
  if (isKeyboardEvent(event)) {
    return <KeyboardEventItem event={event} />;
  } else if (isInputEvent(event)) {
    return <InputEventItem event={event} />;
  } else if (isChangeEvent(event)) {
    return <ChangeEventItem event={event} />;
  } else if (isFocusEvent(event)) {
    return <FocusEventItem event={event} />;
  } else {
    return <UnknownEventItem event={event} />
  }
}

function KeyboardEventItem({ event }: { event: KeyboardEvent }) {
  return <>
    <FontAwesomeIcon icon={ faKeyboard } />
    <FontAwesomeIcon icon={keyIndicatorIcon(event)} />
    {event.key}
  </>;
}

function keyIndicatorIcon(event: KeyboardEvent) {
  switch (event.type) {
    case 'keydown':
      return faArrowDown;
    case 'keyup':
      return faArrowUp;
    case 'keypress':
      return faCircle;
    default:
      throw new Error(`unknown key event.type: ${event.type}`);
  }
}

function InputEventItem({ event }: { event: InputEvent }) {
  return <>
  <FontAwesomeIcon icon={ faSignInAlt } />
  {event.data}
  </>
}

function ChangeEventItem({ event }: { event: ChangeEvent }) {
  return <>
    <FontAwesomeIcon icon={ faWaveSquare} />
    {event.target.id || event.target.type}
  </>;
}

function FocusEventItem({ event }: { event: FocusEvent }) {
  return <>
  <FontAwesomeIcon icon={ faSearch} />
  <FontAwesomeIcon icon={ focusIndicatorIcon(event)} />
  {event.srcElement.id || event.srcElement.type}
  </>
}

function focusIndicatorIcon(event: FocusEvent) {
  switch (event.type) {
    case 'focusin':
      return faArrowRight;
    case 'focusout':
      return faArrowLeft;
    default:
      throw new Error(`unknown focus event ${event.type}`);

  }
}

function UnknownEventItem({ event }: { event: Event }) {
  return <>
    <FontAwesomeIcon icon={ faQuestionCircle} />
    {event.type}
  </>
}
