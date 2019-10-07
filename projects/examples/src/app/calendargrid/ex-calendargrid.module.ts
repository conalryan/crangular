import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExCalendargridRoutingModule } from './ex-calendargrid-routing.module';
import { ExCalendargridComponent } from './ex-calendargrid.component';

@NgModule({
  declarations: [ExCalendargridComponent],
  imports: [
    CommonModule,
    ExCalendargridRoutingModule
  ]
})
export class ExCalendargridModule { }
