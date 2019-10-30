
/**
 * Type abstraction of a dynamic bitmask.
 * Usage: Track flags over an array of unknown length (e.g. rows of data).
 *
 * Note: JS bitmask is 32-bit signed number (vs. number which is 64-bit).
 * Therefore we can store 32 true/false values in same memory as single number.
 * i.e. number[] where each index is bitmask is much more efficient than set<number>()
 * or number[] where each index represents a single 64bit floating point number.
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

/**
 * Dynamic bitmask will store 32 bits in each number.
 * Therefore we must calculate the corerct index across array of numbers
 * i.e. bitIndex 2 will be in numbers[0] while bitIndex 35 will be in numbers[1].
 * @param bitIndex
 */
export const getMaskIndex = (bitIndex: number): number => {
  const maskIndex = Math.floor(bitIndex / 32);
  return maskIndex;
};

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
 */
export const setBit = (bitMask: BitMask, bitIndex: number): void => {
  const maskIndex = getMaskIndex(bitIndex);
  bitMask[maskIndex] = bitMask[maskIndex] | 1 << bitIndex;
};

export const getBit = (bitMask: BitMask, bitIndex: number): number => {
  const maskIndex = getMaskIndex(bitIndex);
  const result = bitMask[maskIndex] & 1 << bitIndex;
  return result >>> bitIndex;
};

export const clearBit = (bitMask: BitMask, bitIndex: number): void => {
  const maskIndex = getMaskIndex(bitIndex);
  bitMask[maskIndex] = bitMask[maskIndex] & ~(1 << bitIndex);
};

export const prevSetBit = (bitMask: BitMask, bitIndex: number): number => {
  let offSet = 0;
  while (bitIndex > -1) {
    if (getBit(bitMask, bitIndex) === 1) {
      break;
    }
    offSet++;
    bitIndex--;
  }
  return offSet;
};

export const nextSetBit = (bitMask: BitMask, bitIndex: number): number => {
  let offSet = 0;
  // while (bitIndex > -1) {
  //   if (getBit(bitMask, bitIndex) === 1) {
  //     break;
  //   }
  //   offSet++;
  //   bitIndex--;
  // }
  return offSet;
};
