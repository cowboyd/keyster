import React from 'react';
import { main, Operation, Context } from 'effection';
import { useMemo, useEffect, useContext, useRef, useState, createContext } from 'react';
import { Atom, Slice } from '@bigtest/atom';
import { subscribe } from '@effection/subscription';

type State = {
  filters: {
    keydown: boolean;
    keyup: boolean;
    keypress: boolean;
    input: boolean;
    change: boolean;
    focusin: boolean;
    focusout: boolean;
  },
  events: Record<string, Event>;
};


function createDefaultAtom() {
  let defaultFilters = {
    keydown: true,
    keyup: false,
    keypress: false,
    input: true,
    change: true,
    focusin: true,
    focusout: false
  };

  let stored = localStorage.getItem('keyster/filters')
  let filters = stored ?
                {...defaultFilters, ...JSON.parse(stored)} :
                defaultFilters;

  return new Atom<State>({
    filters,
    events: {}
  });
}

const AtomContext = createContext<Atom<State>>(createDefaultAtom());

export function useOperation<T>(operation: Operation<T>) : Context<T> {

  let context = useMemo<Context>(() => main(operation), []);

  useEffect(() => () => context.halt(), []);

  return context;
}

export function useAtom() {
  return useContext(AtomContext) as Atom<State>;
}

export function AtomProvider({ children }) {
  let atom = useMemo(() => createDefaultAtom(), []);

  useOperation(function*() {
    yield subscribe(atom.slice('filters')).forEach(function*(state) {
      localStorage.setItem('keyster/filters', JSON.stringify(state));
    })
  })

  return <AtomContext.Provider value={atom}>{children}</AtomContext.Provider>;
}

export function useSlice<T>(...keys): [T, Slice<T, State>] {
  let atom = useAtom();
  let slice = atom.slice(...keys) as Slice<T, State>;

  let [state, setState] = useState<T>(slice.get());

  useOperation(function*() {
    yield subscribe(slice).forEach(function*(state) {
      setState(state);
    });
  });

  return [state, slice];
}
