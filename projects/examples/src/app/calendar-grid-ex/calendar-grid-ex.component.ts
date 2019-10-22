import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarGridData, CalendarGridDataClass } from '../../../../crangular/src/lib/calendargrid/calendargrid';
import { calendarGridData, calendarGridNestedData, calendarGridDoubleNestedData } from './calendar-grid-data.stub';

@Component({
  selector: 'cr-calendar-grid-ex',
  templateUrl: './calendar-grid-ex.component.html',
  styleUrls: ['./calendar-grid-ex.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarGridExComponent {

  calendarGridData: CalendarGridData = calendarGridData();

  calendarGridNestedData: CalendarGridData = calendarGridNestedData();

  calendarGridDoubleNestedData: CalendarGridData = calendarGridDoubleNestedData();

  calendarGridDoulbeNestedDataClass: CalendarGridDataClass = new CalendarGridDataClass(calendarGridDoubleNestedData().rows);

  constructor() {}
}
