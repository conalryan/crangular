/**
 * Type abstraction of a dynamic bitmask.
 * Usage: Track flags over an array of unknown length (e.g. rows of data).
 *
 * Note: JS bitmask is 32-bit signed number (vs. number which is 64-bit).
 * Therefore we can store 31 true/false values in then same memory as single number.
 * i.e. number[] where each index is bitmask is much more efficient than set<number>()
 * or number[] where each index represents a single 64bit floating point number.
 */
export type BitMask = number[];

/**
 * Generate a dynamic bitMask.
 * Helper function to abstract the internal implementation.
 */
export const bitMask = (): BitMask => {
  return [0];
};

/**
 * Returns string of number as base 2.
 * e.g. [3] will print '11'
 */
export const printBits = (n: number): string => {
  const bitStr = n.toString(2);
  console.log(`[bits]: ${bitStr}`);
  return bitStr;
};

/**
 * Returns string of bitMask as base 2.
 * e.g. [3] will print '11'
 */
export const printBitMask = (bitMask: BitMask): string => {
  const bits = bitMask.map(bit => bit.toString(2)).join(', ');
  console.log(`[bits]: ${bits}`);
  return bits;
};

/**
 * Dynamic bitmask stored as signed 32 bit number.
 * We can store 31 flags in each number and must calculate the correct index across array of numbers.
 * i.e. bitIndex 2 will be in numbers[0] while bitIndex 35 will be in numbers[1].
 * @param bitIndex
 */
export const maskIndex = (bitIndex: number): number => {
  return Math.floor(bitIndex / 32);
};

/**
 * Set bit of given number (32-bit signed) to 1 at given index (0 indexed)
 *
 * Use Bitwise OR | with 1 to set a bit (i.e. 1 | 1 === 1, 1 | 0 === 1)
 * Use Leftshift << to set the bit at the desired index.
 *
 * Examples Bitwise OR |
 *  Set 1 in first bit position
 *  a = a | 1 << 0;
 *  a.toString(2); // 1
 *
 *  Set '1' in second bit position
 *  b = b | 1 << 1;
 *  b.toString(2); // 10
 *
 *  Set '1' in third bit position
 *  c = c | 1 << 2;
 *  c.toString(2); // 11
 *
 *  Set '1' in first and fourth bit positions
 *  d = d | 1 << 0;
 *  d = d | 1 << 3;
 *  d.toString(2); // 1001
 */
export const setBit = (bitMask: BitMask, bitIndex: number): void => {
  const index = maskIndex(bitIndex);
  bitMask[index] = bitMask[index] | (1 << bitIndex);
};

/**
 * Returns the bit (0 or 1) at the given index.
 *
 * Use Bitwise AND & with 1 to determine if a bit is set (i.e. 1 & 1 === 1, 1 & 0 === 0)
 * Use Left shift << to get the bit at the desired index.
 * Use Zero-fill Right shift >>> to discard all bits expect the desired index (i.e. result will be 1 or 0).
 */
export const getBit = (bitMask: BitMask, bitIndex: number): number => {
  const index = maskIndex(bitIndex);
  const result = bitMask[index] & (1 << bitIndex);
  return result >>> bitIndex;
};

/**
 * Sets bit to 0 at given index.
 *
 * Use Bitwise AND & with 0 to set the bit to 0 (i.e. 1 & 0 === 0, 0 & 0 === 0)
 * Use Bitwise NOT ~ to invert the bit at the desired index.
 * Use Left shift << to set the bit at the desired index.
 *
 *
 * (1 << bitIndex) sets the bit to 1 at the desired index, essentially making sure it is set to 1.
 * ~ inverts the bit from 1 to 0;
 * & 0 at the given index will always set the bit 0 (i.e. 1 & 0 === 0, 0 & 0 === 0)
 *
 */
export const clearBit = (bitMask: BitMask, bitIndex: number): void => {
  const index = maskIndex(bitIndex);
  bitMask[index] = bitMask[index] & ~(1 << bitIndex);
};

/**
 * Returns the number of indices traversed to find a set bit or -1 if no set bit is found.
 *
 * Given '10010001'
 * From index 4, it will return 3.
 * From index 7, it will return 2.
 */
export const prevSetBit = (bitMask: BitMask, bitIndex: number): number => {
  let bitFound = false;
  let offSet = 0;
  while (bitIndex > -1) {
    if (getBit(bitMask, bitIndex) === 1) {
      bitFound = true;
      break;
    }
    offSet++;
    bitIndex--;
  }
  return bitFound ? offSet : -1;
};
