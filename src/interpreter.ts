import { Token, TokenMode } from './tokenize';
import { read as readString } from './read';

export interface Evaluator<Value> {
  map(atom: Atom, interpreter: Interpreter<Value>): Value;
  reduce(list: List, interpreter: Interpreter<Value>): Value;
  print(value: Value): string;
  initialTokenMode?: TokenMode;
}

export interface Interpreter<Value> {
  read(source: string): AST[];

  evaluate(source: string): Value;
  evaluate(node: AST): Value;

  print(value: Value): string;
  rep(source: string): string;
}

export function createInterpreter<Value>(evaluator: Evaluator<Value>): Interpreter<Value> {
  let rep = (source: string) => read(source).map(evalAST).map(print).join('');

  let interpreter = { read, evaluate, print, rep };

  function read(source: string): AST[] {
    let initialTokenMode = evaluator.initialTokenMode || 'whitespace';
    return readString(source, initialTokenMode);
  }

  function evalAST(node: AST): Value {
    if (node.type === 'atom') {
      return evaluator.map(node, interpreter);
    } else {
      return evaluator.reduce(node, interpreter);
    }
  }

  function evalString(source: string): Value {
    return evaluate(...read(source));
  }

  function evaluate(source: string): Value;
  function evaluate(node: AST): Value;
  function evaluate(...nodes: AST[]): Value;
  function evaluate(...sources: Array<string|AST>): Value {
    let nothing = {};
    let result: Value|typeof nothing = nothing;
    for (let source of sources) {
      result = typeof source === 'string' ? evalString(source) : evalAST(source);
    }
    if (result === nothing) {
      throw new Error('nothing to evaluate');
    }
    return result as Value;
  }

  function print(value: Value) {
    return evaluator.print(value);
  }



  return { read, evaluate, print, rep };
}

export type AST = List | Atom;

export interface Atom {
  type: 'atom',
  value: string;
  token: Token;
}

export interface List {
  type: 'list';
  raw: boolean;
  start: Token;
  end: Token;
  contents: AST[];
}
