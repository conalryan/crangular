import { isNotEmpty, partition, rotateLeft, rotateRight, shallowCopy, zip } from './array.util';

describe('can zip arrays', () => {
  it('should return an empty array if either input is empty', () => {
    expect(zip(undefined, [1])).toEqual([]);
    expect(zip(null, [2])).toEqual([]);
    expect(zip([1, 2, 3], null)).toEqual([]);
    expect(zip(['a', 'b'], undefined)).toEqual([]);
    expect(zip([], [1, 2, 3])).toEqual([]);
    expect(zip([], [])).toEqual([]);
  });

  it('can zip arrays of same length', () => {
    expect(zip([1], [2])).toEqual([[1, 2]]);
    expect(zip(['a', 'b', 'c'], ['foo', 'bar', 'baz'])).toEqual([['a', 'foo'], ['b', 'bar'], ['c', 'baz']]);
  });

  it('limits itself to the length of the shorter list', () => {
    expect(zip([1, 2], [4, 5, 6, 7, 8])).toEqual([[1, 4], [2, 5]]);
    expect(zip([4, 5, 6, 7, 8], [1, 2])).toEqual([[4, 1], [5, 2]]);
  });
});

describe('can rotate arrays', () => {
  it('can rotate left', () => {
    expect(rotateLeft([1, 2, 3, 4], 2)).toEqual([3, 4, 1, 2]);
    expect(rotateLeft([], 100)).toEqual([]);
    expect(rotateLeft(['a'], 1000)).toEqual(['a']);
  });

  it('can rotate right', () => {
    expect(rotateRight([1, 2, 3, 4], 2)).toEqual([3, 4, 1, 2]);
    expect(rotateRight([1, 2, 3, 4], 3)).toEqual([2, 3, 4, 1]);
    expect(rotateRight([], 12)).toEqual([]);
    expect(rotateRight([2], 20)).toEqual([2]);
  });
});

describe('is not empty', () => {
  it('should return false', () => {
    expect(isNotEmpty(undefined)).toEqual(false);
    expect(isNotEmpty(null)).toEqual(false);
    expect(isNotEmpty([])).toEqual(false);
  });

  it('should return true', () => {
    expect(isNotEmpty([''])).toEqual(true);
    expect(isNotEmpty(['1'])).toEqual(true);
    expect(isNotEmpty([1])).toEqual(true);
    expect(isNotEmpty([false])).toEqual(true);
    expect(isNotEmpty([{}])).toEqual(true);
  });
});

it('can partition an array', () => {
  const isEven = (x: number): boolean => {
    return x % 2 === 0;
  };

  expect(partition([], isEven)).toEqual({ matched: [], rest: [] });

  const input = [1, 46, 2, 41, 56, 69];
  const even = input.filter(n => isEven(n));
  const odd = input.filter(n => !isEven(n));
  const lessThan10 = (x: number): boolean => {
    return x < 10;
  };

  const less10 = input.filter(n => lessThan10(n));
  const more10 = input.filter(n => !lessThan10(n));

  expect(partition([1, 46, 2, 41, 56, 69], isEven)).toEqual({ matched: even, rest: odd });
  expect(partition(input, lessThan10)).toEqual({ matched: less10, rest: more10 });
});

describe('shallow copy', () => {
  it('should return empty array', () => {
    expect(shallowCopy(undefined)).toEqual([]);
    expect(shallowCopy(null)).toEqual([]);
    expect(shallowCopy([])).toEqual([]);
  });

  it('should return new array (primitives effectively deep copy)', () => {
    // String
    const oldStrArray = [''];

    const newStrArray = shallowCopy(oldStrArray);
    expect(newStrArray).toEqual(oldStrArray);
    expect(newStrArray).not.toBe(oldStrArray);

    // Modify by index - no effect.
    newStrArray[0] = 'newValue';
    expect(oldStrArray[0]).toEqual('');
    expect(newStrArray[0]).toEqual('newValue');
    expect(newStrArray).not.toEqual(oldStrArray);
    expect(newStrArray).not.toBe(oldStrArray);

    // Number
    const oldNumArray = [1];
    const newNumArray = shallowCopy(oldNumArray);
    expect(newNumArray).toEqual(oldNumArray);
    expect(newNumArray).not.toBe(oldNumArray);

    // Modify by index - no effect.
    newNumArray[0] = 2;
    expect(oldNumArray[0]).toEqual(1);
    expect(newNumArray[0]).toEqual(2);
    expect(newNumArray).not.toEqual(oldNumArray);
    expect(newNumArray).not.toBe(oldNumArray);

    // boolean
    const oldBoolArray = [true];
    const newBoolArray = shallowCopy(oldBoolArray);
    expect(newBoolArray).toEqual(oldBoolArray);
    expect(newBoolArray).not.toBe(oldBoolArray);

    // Modify by index - no effect.
    newBoolArray[0] = false;
    expect(oldBoolArray[0]).toEqual(true);
    expect(newBoolArray[0]).toEqual(false);
    expect(newBoolArray).not.toEqual(oldBoolArray);
    expect(newBoolArray).not.toBe(oldBoolArray);
  });

  it('should return new array (objects - shallow copy)', () => {
    // Blank objects - no effect.
    const oldObjArray = [{}];
    const newObjArray = shallowCopy(oldObjArray);
    expect(newObjArray).toEqual(oldObjArray);
    expect(newObjArray).not.toBe(oldObjArray);

    // Modify by index - no effect.
    newObjArray[0] = {}; // new object ref.
    expect(newObjArray[0]).toEqual(oldObjArray[0]);
    expect(newObjArray).toEqual(oldObjArray);
    expect(newObjArray).not.toBe(oldObjArray);

    // Modify by index - no effect.
    newObjArray[0] = new Object(); // new object ref.
    expect(newObjArray).toEqual(oldObjArray);
    expect(newObjArray).not.toBe(oldObjArray);

    // Modify by index - no effect.
    newObjArray[0] = Object.assign({}, {}); // new object ref.
    expect(newObjArray).toEqual(oldObjArray);
    expect(newObjArray).not.toBe(oldObjArray);

    // Modify by index - no effect.
    newObjArray[0] = { ...{} }; // new object ref.
    expect(newObjArray).toEqual(oldObjArray);
    expect(newObjArray).not.toBe(oldObjArray);

    // Modify by index - no effect.
    newObjArray[0] = { newProp: 'newValue' };
    expect(oldObjArray[0]).toEqual({});
    expect(newObjArray[0]).toEqual({ newProp: 'newValue' });
    expect(newObjArray).not.toEqual(oldObjArray);
    expect(newObjArray).not.toBe(oldObjArray);

    // Splicing Test
    const oldSplice = [{ old1: 'old1' }, { old2: 'old2' }];
    const newSplice = shallowCopy(oldSplice);
    expect(newSplice).toEqual(oldSplice);
    expect(newSplice).not.toBe(oldSplice);

    // Splicing array - no effect.
    newSplice.splice(0, 1);
    expect(newSplice).toEqual([{ old2: 'old2' }]);
    expect(oldSplice).toEqual([{ old1: 'old1' }, { old2: 'old2' }]);
    expect(newSplice).not.toEqual(oldSplice);
    expect(newSplice).not.toBe(oldSplice);

    // Pushing Test
    const oldPush = [{ old1: 'old1' }];
    const newPush = shallowCopy(oldPush);
    expect(newPush).toEqual(oldPush);
    expect(newPush).not.toBe(oldPush);

    // Pushing array - no effect.
    newPush.push({ new1: 'new1' });
    expect(oldPush).toEqual([{ old1: 'old1' }]);
    expect(newPush).toEqual([{ old1: 'old1' }, { new1: 'new1' }]);
    expect(newPush).not.toEqual(oldPush);
    expect(newPush).not.toBe(oldPush);

    // WARNING:
    // Objects with properties will be modified by reference. Be careful!
    const oldObjPropArray = [{ oldProp: 'oldValue' }];
    const newObjPropArray = shallowCopy(oldObjPropArray);
    expect(newObjPropArray).toEqual(oldObjPropArray);
    expect(newObjPropArray).not.toBe(oldObjPropArray);

    // Modify by index - Oops modifies property in old array too!
    newObjPropArray[0].oldProp = 'newValue';
    expect(oldObjPropArray[0].oldProp).toEqual('newValue'); // Oops, modified (copied array) object by reference.
    expect(newObjPropArray).toEqual(oldObjPropArray);
    expect(newObjPropArray).not.toBe(oldObjPropArray); // Array is different, but object ref. inside is same.
  });
});
