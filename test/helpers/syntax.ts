import { createInterpreter, AST } from '../../src';

export const syntax = createInterpreter<AST>({
  initialTokenMode: 'raw',
  map: atom => atom,
  reduce: list => list,
  print
});

function print(value: AST): string {
  switch (value.type) {
    case "atom":
      return value.value;
    case "list":
      let { raw, contents } = value;
      let separator = raw ? '': ' ';
      let start = raw ? '@{' : '{';
      return `${start}${contents.map(print).join(separator)}}`;
  }
}
