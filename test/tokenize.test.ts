import { describe, it } from 'mocha';
import expect from 'expect';

import { Token, TokenMode, tokenize } from '../src/tokenize';

describe('tokenize', () => {
  describe('raw', () => {
    it('tokenizes all charaters', () => {
      expect(values("It's rad!", 'raw')).toEqual([
        'I', 't', "'", 's', ' ', 'r','a', 'd', '!'
      ]);
      expect(indexes("it's rad!", 'raw')).toEqual([
        0,1,2,3,4,5,6,7,8
      ])
    });
    it('tokensizes @{ separately', () => {
      expect(values("hi@{ho}", 'raw')).toEqual([
        'h','i','@{','h','o','}'
      ]);
      expect(indexes("hi@{ho}", 'raw')).toEqual([
        0,1,2,4,5,6
      ])
    });
    it('accepts a lone "@" just fine', () => {
      expect(values("@ {}", 'raw')).toEqual([
        '@',' ', '{', '}'
      ])
    });
  });
  describe('whitespace', () => {
    it('tokenizes a list of words', () => {
      expect(values("one two three", 'whitespace')).toEqual([
        'one', 'two', 'three'
      ]);
      expect(indexes("one two three", 'whitespace')).toEqual([
        0,4,8
      ]);
    });
    it('is eliminated from around tokens at all edges', () => {
      expect(values(" one \n two  three  \t ", 'whitespace')).toEqual([
        'one','two','three'
      ]);
      expect(indexes(" one \n two  three  \t ", 'whitespace')).toEqual([
        1,7,12
      ])
    });
  });
});

function* tokens(source: string, mode: TokenMode) {
  let iterator = tokenize(source, mode);
  for (let current = iterator.next(mode); !current.done; current = iterator.next(mode)) {
    yield current.value;
  }
}


function values(source: string, mode: TokenMode) {
  return [...tokens(source, mode)].map(token => token.value);
}

function indexes(source: string, mode: TokenMode) {
  return [...tokens(source, mode)].map(token => token.location.position);
}
