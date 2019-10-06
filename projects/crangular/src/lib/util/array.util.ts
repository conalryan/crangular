/**
 * Returns if an array is null, undefined or length === 0.
 * @param array
 */
export const isEmpty = (array: any[]): boolean => {
  return !array || array.length === 0;
};

/**
 * Returns if an array is not null, undefined and length > 0.
 * Note: Does not check that item(s) in array are truthy
 * i.e. [''] and [{}] will return true.
 * @param array
 */
export const isNotEmpty = (array: any[]): boolean => {
  return !!(array && array.length > 0);
};

/**
 * Fast shallow copy http://jsben.ch/wQ9RU
 * @param array
 */
export const shallowCopy = (array: any[]): any[] => {
  let newArray = [];
  if (isNotEmpty(array)) {
    newArray = array.slice(0);
  }
  return newArray;
};

/**
 * Zips two arrays.
 *
 * Takes two arrays as inputs and returns a single array
 * which is a result o merging the two inputs where
 * i'th element in the result is an array comprising of
 * i'th elements in the input arrays.
 *
 * If the two arrays are of different lengths, the resulting
 * array will be the same length as the shorter one.
 *
 * Example: zip([1], [2,3]) => [[1,2]]
 * zip(['a', 'b', 'c'], [1,2,3]) => [['a', 1], ['b', 2], ['c', 3]]
 */
export const zip = <T>(left: T[], right: T[]): T[][] => {
  if (isEmpty(left) || isEmpty(right)) {
    return [];
  }

  return left
    .map((e, i) => {
      return [e, right[i]];
    })
    .filter(e => {
      return e[0] !== undefined && e[1] !== undefined;
    });
};

/**
 * Shifts the array items left `n` times.
 *
 * @param arr input array to rotate
 * @param times number of times to shift items to the left
 */
export const rotateLeft = <T>(arr: T[], times: number): T[] => {
  if (isEmpty(arr) || arr.length === 1 || times < 1) {
    return arr;
  }

  const temp = [...arr];
  for (let i = 0; i < times; i++) {
    const first = temp.shift();
    temp.push(first);
  }
  return temp;
};

/**
 * Shifts the array items right `n` times.
 *
 * http://jsben.ch/TgXMk
 *
 * Benchmarks behaves very differently in chrome/firefox and other webkit browsers :)
 *
 * @param arr input array to rotate
 * @param times number of times to shift items to the right
 */
export const rotateRight = <T>(arr: T[], times: number): T[] => {
  if (isEmpty(arr) || arr.length === 1 || times < 1) {
    return arr;
  }

  const temp = arr.slice().reverse();
  const shifted = rotateLeft(temp, times);
  return shifted.reverse();
};

export const last = <T>(array: T[]): T | undefined => {
  let item;
  if (isNotEmpty(array)) {
    item = array[array.length - 1];
  }
  return item;
};

/**
 * Partitions the input array into an array of two buckets.
 *
 * @param arr input array that we want to partition
 * @param f predicate function that decides which bucket an element belongs to
 */
export const partition = <T>(arr: T[], f: (_: T) => boolean): { matched: T[]; rest: T[] } => {
  if (isEmpty(arr)) {
    return {
      matched: [],
      rest: []
    };
  }
  return arr.reduce(
    (acc, elem) => {
      if (f(elem)) {
        acc.matched.push(elem);
      } else {
        acc.rest.push(elem);
      }
      return acc;
    },
    { matched: [], rest: [] }
  );
};
