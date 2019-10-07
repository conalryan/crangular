import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarGridLabelDirective, CalendarGridCellDirective, CalendarGridRowDirective, CalendarGridComponent } from './calendargrid';

@NgModule({
  declarations: [
    CalendarGridLabelDirective,
    CalendarGridCellDirective,
    CalendarGridRowDirective,
    CalendarGridComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalendargridModule { }
