import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

export const printBits = (n: number): void => {
  console.log(`n.toString(2): ${n.toString(2)}`);
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
export const setBit = (n: number, bitIndex: number): void => {
  console.log('setting bit');
  console.log(`n: ${n}`);
  console.log(`bitIndex: ${bitIndex}`);
  n = n | 1 << bitIndex;
  console.log(`n: ${n}`);
};

export const setAndReturnBit = (n: number, bitIndex: number): number => {
  const bitMask = 1 << bitIndex;
  return n | bitMask;
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
