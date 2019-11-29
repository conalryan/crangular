import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BitMask, clearBit, getBit, prevSetBit, printBitMask, setBit } from '../../../../crangular/src/lib/bits/bits';

@Component({
  selector: 'cr-bits-ex',
  templateUrl: './bits-ex.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitsExComponent {

  singleBitMask: number;
  bitMask: BitMask;
  printBitMask = printBitMask;

  constructor() {
    this.singleBitMask = 0;
    this.bitMask = [0];
  }

  setBit(bitIndex: string): void {
    const index = bitIndex ? +bitIndex : 0;
    this.singleBitMask = this.singleBitMask | 1 << index;
    setBit(this.bitMask, index);
  }

  getBit(bitIndex: string): number {
    const index = bitIndex ? +bitIndex : 0;
    return getBit(this.bitMask, index);
  }

  clearBit(bitIndex: string): void {
    const index = bitIndex ? +bitIndex : 0;
    clearBit(this.bitMask, index);
  }

  setAll(num: number): void {
    for (let i = 0; i < num; i++) {
      this.setBit(i.toString());
    }
  }

  getOffset(index: number): number {
    const off = prevSetBit(this.bitMask, index);
    console.log(`[offset]: ${off}`);
    return off;
  }
}
