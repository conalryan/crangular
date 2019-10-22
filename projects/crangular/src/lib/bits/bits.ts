import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

export const printBits = (n: number): void => {
  console.log(n.toString(2));
};

export const setBit = (n: number, bitIndex: number): number => {
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
