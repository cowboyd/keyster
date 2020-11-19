import { Context, Operation, main } from 'effection';

import { beforeEach, afterEach } from 'mocha';

type World = Context & {
  spawn<T>(operation: Operation<T>): Context<T>;
}

let currentWorld: World;

beforeEach(() => {
  currentWorld = main(undefined) as World;;
});

afterEach(() => {
  currentWorld.halt();
})

export function run<T>(operation: Operation<T>): Context<T> {
  return currentWorld.spawn<T>(operation);
}
