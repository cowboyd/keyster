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
  },
  events: Event[];
};


function createDefaultAtom() {
  return new Atom<State>({
    filters: {
      keydown: true,
      keyup: false,
      keypress: false
    },
    events: []
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
  let atom = useMemo(() => createDefaultAtom());
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
