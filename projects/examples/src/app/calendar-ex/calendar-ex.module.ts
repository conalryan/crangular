import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'projects/crangular/src/lib/calendar/calendar.module';
import { CalendarExRoutingModule } from './calendar-ex-routing.module';
import { CalendarExComponent } from './calendar-ex.component';

@NgModule({
  declarations: [
    CalendarExComponent
  ],
  imports: [
    CommonModule,
    CalendarExRoutingModule,
    CalendarModule
  ]
})
export class CalendarExModule { }
