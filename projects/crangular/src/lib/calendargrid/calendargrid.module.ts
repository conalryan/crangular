import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarGridCellComponent, CalendarGridCellTplDirective, CalendarGridComponent, CalendarGridLabelTplDirective, CalendarGridRowDirective, CalendarGridLabelElmDirective } from './calendargrid';

@NgModule({
  declarations: [
    CalendarGridLabelTplDirective,
    CalendarGridLabelElmDirective,
    CalendarGridCellTplDirective,
    CalendarGridRowDirective,

    CalendarGridCellComponent,
    CalendarGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarGridLabelTplDirective,
    CalendarGridLabelElmDirective,
    CalendarGridCellTplDirective,
    CalendarGridRowDirective,

    CalendarGridCellComponent,
    CalendarGridComponent
  ]
})
export class CalendargridModule { }
