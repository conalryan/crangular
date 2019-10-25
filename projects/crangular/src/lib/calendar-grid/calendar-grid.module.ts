import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  CalendarGridCellComponent,
  CalendarGridCellTplDirective,
  CalendarGridComponent,
  CalendarGridLabelTplDirective,
  CalendarGridRowDirective,
  CalendarGridLabelElmDirective,
  CalendarGridClassComponent
} from "./calendar-grid";

@NgModule({
  declarations: [
    CalendarGridLabelTplDirective,
    CalendarGridLabelElmDirective,
    CalendarGridCellTplDirective,
    CalendarGridRowDirective,

    CalendarGridCellComponent,
    CalendarGridComponent,

    CalendarGridClassComponent
  ],
  imports: [CommonModule],
  exports: [
    CalendarGridLabelTplDirective,
    CalendarGridLabelElmDirective,
    CalendarGridCellTplDirective,
    CalendarGridRowDirective,

    CalendarGridCellComponent,
    CalendarGridComponent,

    CalendarGridClassComponent
  ]
})
export class CalendarGridModule {}