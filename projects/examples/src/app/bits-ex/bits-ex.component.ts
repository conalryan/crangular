import { ChangeDetectionStrategy, Component } from '@angular/core';
import { printBits, setBitObj, setBits, BitMask, setBitMask } from '../../../../crangular/src/lib/bits/bits';

@Component({
  selector: 'cr-bits-ex',
  templateUrl: './bits-ex.component.html',
  styleUrls: ['./bits-ex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitsExComponent {

  bitMask: number;
  bitMasks: number[];
  bitMaskObj: {bitMask: number};

  bitMaskT: BitMask;

  constructor() {
    this.bitMask = 0;
    this.bitMasks = [0];
    this.bitMaskObj = {bitMask: 0};
    this.bitMaskT = [0];
  }

  setBits(bitIndex: number): void {
    console.log(`bitIndex: ${bitIndex}`);

    printBits(this.bitMask);
    // Pass by value
    // this.bitMask = this.bitMask | setBit(this.bitMask, bitIndex);
    this.bitMask = this.bitMask | 1 << bitIndex;
    printBits(this.bitMask);

    // Pass by array
    console.log(`bitMasks:`);
    printBits(this.bitMasks[0]);
    setBits(this.bitMasks, bitIndex);
    printBits(this.bitMasks[0]);

    // Pass by ref
    console.log(`bitMaskObj.bitMask:`);
    printBits(this.bitMaskObj.bitMask);
    setBitObj(this.bitMaskObj, bitIndex);
    printBits(this.bitMaskObj.bitMask);

    // Pass by ref BitMask type
    console.log(`BitMask:`);
    printBits(this.bitMaskT[0]);
    setBitMask(this.bitMaskT, bitIndex);
    printBits(this.bitMaskT[0]);
  }
}
