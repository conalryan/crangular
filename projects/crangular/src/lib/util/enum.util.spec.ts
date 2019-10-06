import { enumValueOfString } from './enum.util';

describe('enum utils', () => {
  it('can convert a string to an enum key', () => {
    enum Test {
      ONE = 'One',
      TWO = 'Two'
    }

    expect(enumValueOfString('One', Test)).toEqual(Test.ONE);
    expect(enumValueOfString('Invalid', Test)).toBeNull();
  });
});
