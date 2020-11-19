import { describe, it } from 'mocha';

import { Keyboard } from '..';

import { run } from './helpers';

describe('keyboard', () => {
  let keyboard: Keyboard;

  beforeEach(async () => {
    keyboard = await run(createKeyboard())
    yield press(keyboard.a);
    yield release(keyboard.b);
      .a.press()
      .a.release()


  });

  it('works', () => {

  });
})
