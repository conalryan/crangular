import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarGridCellComponent, CalendarGridCellDirective, CalendarGridComponent, CalendarGridLabelComponent, CalendarGridLabelDirective, CalendarGridRowComponent, CalendarGridRowDirective } from './calendargrid';

@NgModule({
  declarations: [
    CalendarGridLabelDirective,
    CalendarGridCellDirective,
    CalendarGridRowDirective,
    CalendarGridLabelComponent,
    CalendarGridCellComponent,
    CalendarGridRowComponent,
    CalendarGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarGridLabelDirective,
    CalendarGridCellDirective,
    CalendarGridRowDirective,
    CalendarGridLabelComponent,
    CalendarGridCellComponent,
    CalendarGridRowComponent,
    CalendarGridComponent
  ]
})
export class CalendargridModule { }
