export interface Token {
  value: string;
  length: number;
  location: Location;
}

export interface Location {
  source: string;
  position: number;
  first: string;
  rest: Location;
  string: string;
}

export type TokenMode = 'raw' | 'whitespace';

type TokenizerResult = IteratorResult<{
  token: Token;
  location: Location;
}, undefined>;

export function* tokenize(source: string, initial: TokenMode = 'raw'): Generator<Token, void, TokenMode> {
  function next(location: Location, mode: TokenMode): TokenizerResult {
    switch (location.first) {
      case null:
      case undefined:
      case '':
        return { done: true, value: undefined };
      case '@':
        if (location.rest.first === '{') {
          return {
            done: false,
            value: {
              token: createToken(location, 2),
              location: location.rest.rest
            }
          }
        }
      default:
        if (mode === 'raw' || location.first === '{' || location.first === '}') {
          return {
            done: false,
            value: {
              token: createToken(location, 1),
              location: createLocation(source, location.position + 1)
            }
          };
        } else {
          let nextToken = /^\s*(.*?)(?=\s|{|}|@{|$)/;
          let match  = location.string.match(nextToken);
          if (match === null || match[1] === '') {
            return { done: true, value: undefined };
          } else {
            let [, value] = match;
            let index = source.indexOf(value, location.position)
            let tokenLocation = createLocation(source, index);

            return {
              done: false,
              value: {
                token: createToken(tokenLocation, value.length),
                location: createLocation(source, index + value.length)
              }
            }
          }
        }
    }
  }

  let current = next(createLocation(source, 0), initial);

  while (!current.done) {
    let mode = yield current.value.token;
    current = next(current.value.location, mode);
  }
}

function createLocation(source: string, position: number): Location {
  return {
    source,
    position,
    get first(): string {
      return source.charAt(position);
    },
    get rest() {
      return createLocation(source, position + 1);
    },
    get string() {
      return source.slice(position);
    }
  }
}

function createToken(location: Location, length: number): Token {
  return {
    location,
    length,
    get value() {
      return location.source.slice(location.position, location.position + length);
    }
  }
}
