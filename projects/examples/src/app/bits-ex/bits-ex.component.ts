import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { setBit, printBits } from '../../../../crangular/src/lib/bits/bits';

@Component({
  selector: 'cr-bits-ex',
  templateUrl: './bits-ex.component.html',
  styleUrls: ['./bits-ex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitsExComponent implements OnInit {

  bitMask: number;

  constructor() {
    this.bitMask = 0;
  }

  ngOnInit() {
  }

  setBits(bitIndex: number): void {
    console.log(bitIndex);
    printBits(this.bitMask);
    const bit = setBit(this.bitMask, bitIndex);
    printBits(bit);
  }
}
