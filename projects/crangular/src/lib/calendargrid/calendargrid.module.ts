import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarGridCellComponent, CalendarGridCellTplDirective, CalendarGridComponent, CalendarGridLabelTplDirective, CalendarGridRowComponent, CalendarGridRowDirective, CalendarGridLabelElmDirective } from './calendargrid';

@NgModule({
  declarations: [
    CalendarGridLabelTplDirective,
    CalendarGridLabelElmDirective,
    CalendarGridCellTplDirective,
    CalendarGridRowDirective,

    CalendarGridCellComponent,
    // CalendarGridRowComponent,
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
    // CalendarGridRowComponent,
    CalendarGridComponent
  ]
})
export class CalendargridModule { }
