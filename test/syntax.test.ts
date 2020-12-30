import { describe, it } from 'mocha';
import expect from 'expect';

import { syntax } from './helpers';

const { rep } = syntax;

describe('syntax', () => {
  it('parses per character by default', () => {
    expect(rep("hello world")).toEqual("hello world");
  });

  it('can handle a raw mode list', () => {
    expect(rep("@{hello world}")).toEqual("@{hello world}");
  });

  it('can handle whitespace mode list', () => {
    expect(rep("hello world {I'm  watching}")).toEqual("hello world {I'm watching}")
  });

  it('handles deeply nested whitespace and raw trees', () => {
    expect(rep('{+ @{*42}{* 3 2} }')).toEqual('{+ @{*42} {* 3 2}}');
  });
})
