import { ChangeDetectionStrategy, Component } from '@angular/core';
import { sizeof } from '../../../../crangular/src/lib/bits/sizeof';

@Component({
  selector: 'cr-sizeof-ex',
  templateUrl: './sizeof-ex.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeofExComponent {
  // bitmask
  bit1: number;
  bit2: number;
  // boolean
  bool1: boolean;
  boolArr1: boolean[];
  boolArr2: boolean[];
  // number
  num1: number;
  numArr1: number[];
  numArr2: number[];
  // object
  objEmpty: {};
  objStr1: {str: string};
  // set
  setNumEmpty: Set<number>;
  setNum1: Set<number>;
  setNum2: Set<number>;
  // string
  str1: string;
  str2: string;
  strArr1: string[];
  strArr2: string[];

  sizeof = sizeof;

  constructor() {
    // bit
    this.bit1 = 0 | 1 << 0;
    this.bit2 = 3; // 11
    // bool
    this.bool1 = true;
    this.boolArr1 = [true];
    this.boolArr2 = [true, false];
    // number
    this.num1 = 1;
    this.numArr1 = [1];
    this.numArr2 = [1, 2];
    // object
    this.objEmpty = {};
    this.objStr1 = {str: 'b'};
    // set
    this.setNumEmpty = new Set<number>();
    this.setNum1 = new Set<number>([1]);
    this.setNum2 = new Set<number>([1, 2]);
    // string
    this.str1 = 'a';
    this.str2 = 'ab';
    this.strArr1 = ['a'];
    this.strArr2 = ['a', 'b'];
  }

  boolToBits(bools: boolean[]): string {
    let bits = '';
    bools.forEach(bool => {
      bits = (+bool).toString(2);
    });
    return bits;
  }

  numsToBits(nums: number[]): string {
    let bits = '';
    nums.forEach(num => {
      bits += num.toString(2);
    });
    return bits;
  }

  setNumsToBits(set: Set<number>): string {
    let bits = '';
    set.forEach(num => {
      bits += num.toString(2);
    });
    return bits;
  }
}
