import { describe, it } from 'mocha';
import expect from 'expect';

import { rep } from '..';

describe('input language', () => {
  it('parses per character by default', () => {
    expect(rep("hello world")).toEqual("hello world");
  });

  it('can handle a raw mode list', () => {
    expect(rep("@{hello world}")).toEqual("@{hello world}");
  });

  it.only('can handle whitespace mode list', () => {
    expect(rep("hello world {I'm  watching}")).toEqual("hello world {I'm watching}")
  });
})
