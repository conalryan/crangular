import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BitsExRoutingModule } from './bits-ex-routing.module';
import { BitsExComponent } from './bits-ex.component';
import { SizeofExComponent } from './sizeof-ex.component';

@NgModule({
  declarations: [BitsExComponent, SizeofExComponent],
  exports: [BitsExComponent, SizeofExComponent],
  imports: [
    CommonModule,
    BitsExRoutingModule
  ]
})
export class BitsExModule { }
