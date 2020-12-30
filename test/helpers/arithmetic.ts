import { createInterpreter } from '../../src/index';

interface Operator {
  name: string;
  initial: number;
  reducer: (cumulate: number, current: number) => number;
}

export const arithmetic = createInterpreter<number|Operator>({
  map(atom) {
    switch (atom.value) {
      case '+':
        return {
          name: '+',
          initial: 0,
          reducer: (sum, value) => sum + value
        };
      case '*':
        return {
          name: '*',
          initial: 1,
          reducer: (result, value) => result * value
        }
      default:
        return Number(atom.value)
    }
  },

  reduce(list, interpreter) {
    let [first, ...rest] = list.contents;

    if (first == null) {
      throw new Error('cannot do math on nothing!');
    }

    let operator = interpreter.evaluate(first);

    if (typeof operator === 'number') {
      throw new Error(`expected an operator, but received a number ${operator}`);
    } else {
      let operands = rest.map(node => interpreter.evaluate(node));
      return operands.reduce((cucumulate: number, current: Operator| number) => {
        if (typeof current === 'number') {
          return (operator as Operator).reducer(cucumulate, current);
        } else {
          throw new Error(`operator found where number expected`);
        }
      }, operator.initial);
    }
  },

  print(value) {
    return String(value);
  }
});
