import { ChangeDetectionStrategy, Component } from '@angular/core';
import { printBits, setBitObj, setBits, BitMask, setBitMaskZero } from '../../../../crangular/src/lib/bits/bits';

@Component({
  selector: 'cr-bits-ex',
  templateUrl: './bits-ex.component.html',
  styleUrls: ['./bits-ex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitsExComponent {

  bitMaskNum: number;
  bitMaskNums: number[];
  bitMaskObj: {bitMask: number};
  bitMask: BitMask;

  constructor() {
    this.bitMaskNum = 0;
    this.bitMaskNums = [0];
    this.bitMaskObj = {bitMask: 0};
    this.bitMask = [0];
  }

  setBits(bitIndex: number): void {
    console.log(`bitIndex: ${bitIndex}`);

    printBits(this.bitMaskNum);
    // Pass by value
    // this.bitMask = this.bitMask | setBit(this.bitMask, bitIndex);
    this.bitMaskNum = this.bitMaskNum | 1 << bitIndex;
    printBits(this.bitMaskNum);

    // Pass by array
    console.log(`bitMasks:`);
    printBits(this.bitMaskNums[0]);
    setBits(this.bitMaskNums, bitIndex);
    printBits(this.bitMaskNums[0]);

    // Pass by ref
    console.log(`bitMaskObj.bitMask:`);
    printBits(this.bitMaskObj.bitMask);
    setBitObj(this.bitMaskObj, bitIndex);
    printBits(this.bitMaskObj.bitMask);

    // Pass by ref BitMask type
    console.log(`BitMask:`);
    printBits(this.bitMask[0]);
    setBitMaskZero(this.bitMask, bitIndex);
    printBits(this.bitMask[0]);
  }
}
