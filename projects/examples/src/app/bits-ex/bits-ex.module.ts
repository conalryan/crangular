import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitsExRoutingModule } from './bits-ex-routing.module';
import { BitsExComponent } from './bits-ex.component';
import { BitsModule } from 'projects/crangular/src/lib/bits/bits.module';

@NgModule({
  declarations: [BitsExComponent],
  exports: [BitsExComponent],
  imports: [
    CommonModule,
    BitsExRoutingModule,
    BitsModule
  ]
})
export class BitsExModule { }
