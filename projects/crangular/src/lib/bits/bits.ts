import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

export type BitMask = number[];

export const printBits = (n: number): void => {
  console.log(`printBits: n.toString(2): ${n.toString(2)}`);
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

export const setBitMask = (bitMask: BitMask, bitIndex: number): void => {
  bitMask[0] = bitMask[0] | 1 << bitIndex;
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
