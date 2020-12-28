import { Token, TokenMode, tokenize } from './src/tokenize';

export function rep(source: string): string {
  return print(...evaluate(...read(source)));
}

export function evaluate(...nodes: AST[]): AST[] {
  return nodes;
}

export function read(source: string): AST[] {
  let nodes = [] as AST[];

  let mode: TokenMode = 'raw';

  let stack = [{
    append: (node: AST) => nodes.push(node),
    end: () => { throw new Error('!'); }
  }] as [Accumulator, ...Accumulator[]];


  let begin = (start: Token, tokenizeMode: TokenMode) => {
    let contents = [] as AST[];
    let raw = tokenizeMode === 'raw';
    let originalMode = mode;
    mode = tokenizeMode;
    stack.push({
      append: (node) => contents.push(node),
      end: (end) => {
        mode = originalMode;
        return { type: 'list', raw, contents, start, end }
      }
    });
  }

  let accumulate = (node: AST) => stack[stack.length - 1].append(node);

  let end = (token: Token) => {
    let top = stack.pop();
    if (!top) {
      throw new Error('TODO end');
    }
    accumulate(top.end(token));
  }

  let tokens = tokenize(source, mode);

  for (let next = tokens.next(mode); !next.done; next = tokens.next(mode)) {
    let token = next.value as Token;
    switch (token.value ) {
      case '@{':
        begin(token, 'raw');
        continue;
      case '{':
        begin(token, 'whitespace');
        continue;
      case '}':
        end(token);
        continue;
      default:
        accumulate({
          type: 'atom',
          token,
          get value() { return token.value; }
        })

    }
  }
  return nodes;
}

export function print(...nodes: AST[]): string {
  function printAtom(atom: Atom): string {
    return atom.value;
  }

  function printList(list: List): string {
    let separator = list.raw ? '': ' ';
    let start = list.raw ? '@{': '{';
    return `${start}${list.contents.map(node => print(node)).join(separator)}}`;
  }

  return nodes.map(node => node.type === 'atom' ? printAtom(node) : printList(node)).join('');
}

type AST = List | Atom;

interface Atom {
  type: 'atom',
  value: string;
  token: Token;
}

interface List {
  type: 'list';
  raw: boolean;
  start: Token;
  end: Token;
  contents: AST[];
}

interface Accumulator {
  append(node: AST): void;
  end(token: Token): AST;
}
