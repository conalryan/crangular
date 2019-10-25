
/**
 * Set bit of given number (32-bit signed) to 1 at given index (0 indexed)
 *
 * Examples Bitwise OR |
 *  Set 1 in first bit position
 *  a = a | 1 << 0;
 *  a.toString(2); // 1
 *
 *  Set '1' in second bit position
 *  a = a | 1 << 1;
 *  a.toString(2); // 10
 *
 *  Set '1' in third bit position
 *  a = a | 1 << 2;
 *  a.toString(2); // 11
 *
 */

/**
 * Type to abstract implementation of a dynamic bitmask.
 * Usage: Track flags over an array of unknown length.
 * Note: JS bitmask is 32-bit signed number vs 64-bit number type.
 * Therefore, number[] is much more efficient than set<number>
 */
export type BitMask = number[];

export const printBits = (n: number): string => {
  const bitStr = n.toString(2);
  console.log(`[bits]: ${bitStr}`);
  return bitStr;
};

export const printBitMask = (bitMask: BitMask): string => {
  const bits = bitMask.map(bit => bit.toString(2)).join('');
  console.log(`[bits]: ${bits}`);
  return bits;
};

export const getMaskIndex = (bitIndex: number): number => {
  const maskIndex = Math.floor(bitIndex / 32);
  return maskIndex;
};

export const setBitMask = (bitMask: BitMask, bitIndex: number): void => {
  const maskIndex = getMaskIndex(bitIndex);
  bitMask[maskIndex] = bitMask[maskIndex] | 1 << bitIndex;
};

export const getBitMask = (bitMask: BitMask, bitIndex: number): number => {
  const maskIndex = getMaskIndex(bitIndex);
  const result = bitMask[maskIndex] & 1 << bitIndex;
  return result >>> bitIndex;
};

export const clearBitMask = (bitMask: BitMask, bitIndex: number): void => {
  const maskIndex = getMaskIndex(bitIndex);
  bitMask[maskIndex] = bitMask[maskIndex] & ~(1 << bitIndex);
};
