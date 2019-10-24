import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

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
 * @param n
 * @param bitIndex
 */
export const setBit = (n: number, bitIndex: number): number => {
  const bitMask = 1 << bitIndex;
  return n | bitMask;
};

export const setBits = (bits: number[], bitIndex: number): void => {
  // TODO: temp using 0 to test pass by ref with array
  const bitMask = 1 << bitIndex;
  bits[0] = bits[0] | bitMask;
};

export const setBitObj = (bitMaskObj: {bitMask: number}, bitIndex: number): void => {
  const bitMask = 1 << bitIndex;
  bitMaskObj.bitMask = bitMaskObj.bitMask | bitMask;
};

export const getBit = (n: number, bitIndex: number): number => {
  const bitMask = 1 << bitIndex;
  const result = n & bitMask;
  return result >>> bitIndex;
};

export const clearBit = (n: number, bitIndex: number): number => {
  const bitMask = ~(1 << bitIndex);
  return n & bitMask;
};

export type BitMask = number[];

export const printBits = (n: number): void => {
  console.log(`Bits: ${n.toString(2)}`);
};

export const getMaskIndex = (bitIndex: number): number => {
  const maskIndex = Math.floor(bitIndex / 32);
  console.log(maskIndex);
  return maskIndex;
};

export const setBitMaskZero = (bitMask: BitMask, bitIndex: number): void => {
  bitMask[0] = bitMask[0] | 1 << bitIndex;
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

export const clearBitMask = (bitMask: BitMask, bitIndex: number): number => {
  const maskIndex = getMaskIndex(bitIndex);
  return bitMask[maskIndex] & ~(1 << bitIndex);
};

@Component({
  selector: 'cr-bits',
  template: `
    <p>
      bits works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
