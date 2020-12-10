function isEvent<E extends Event>(match: (event: Event) => boolean): (event: Event) => event is E {
  return evt => !!evt && !!evt.type && match(evt);
}

export const isKeyboardEvent = isEvent<KeyboardEvent>(event => event.type.startsWith('key'));
export const isInputEvent = isEvent<InputEvent>(event => event.type === 'input');
export const isChangeEvent = isEvent<Event & { type: 'change' }>(event => event.type === 'change');
export const isFocusEvent = isEvent<FocusEvent>(event => event.type.startsWith('focus'));
