import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExCalendargridRoutingModule } from './ex-calendargrid-routing.module';
import { ExCalendargridComponent } from './ex-calendargrid.component';
import { CalendargridModule } from '../../../../crangular/src/lib/calendargrid/calendargrid.module';

@NgModule({
  declarations: [ExCalendargridComponent],
  imports: [
    CommonModule,
    CalendargridModule,
    ExCalendargridRoutingModule
  ]
})
export class ExCalendargridModule { }
