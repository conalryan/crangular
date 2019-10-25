import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BitMask, clearBitMask, getBitMask, printBitMask, setBitMask } from '../../../../crangular/src/lib/bits/bits';

@Component({
  selector: 'cr-bits-ex',
  templateUrl: './bits-ex.component.html',
  styleUrls: ['./bits-ex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitsExComponent {

  bitMask: BitMask;
  printBitMask = printBitMask;

  constructor() {
    this.bitMask = [0];
  }

  setBit(bitIndex: string): void {
    const index = bitIndex ? +bitIndex : 0;
    setBitMask(this.bitMask, index);
  }

  getBit(bitIndex: string): number {
    const index = bitIndex ? +bitIndex : 0;
    return getBitMask(this.bitMask, index);
  }

  clearBit(bitIndex: string): void {
    const index = bitIndex ? +bitIndex : 0;
    clearBitMask(this.bitMask, index);
  }
}
