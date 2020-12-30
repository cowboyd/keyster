import { describe, it } from 'mocha';
import expect from 'expect';

import { arithmetic } from './helpers';

const { evaluate } = arithmetic;

describe('arithmetic interpreter', () => {
  it('can handle number literals', () => {
    expect(evaluate("5")).toEqual(5);
    expect(evaluate("42")).toEqual(42);
  });

  it('can add', () => {
    expect(evaluate("{+ 3 4}")).toEqual(7);
  });

  it('can multiply', () => {
    expect(evaluate("{* 12}")).toEqual(12);
    expect(evaluate("{* 12 12}")).toEqual(144);
  })

  it('can reduce complex expressions', () => {
    expect(evaluate("{+ {* 3 2} {* 7 2}}")).toEqual(20);
  });
});
