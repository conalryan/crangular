import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarGridData } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows } from './calendar-grid-data.stub';

@Component({
  selector: 'cr-no-templates',
  template: `
    <h1><a [routerLink]="['/calendar-grid']">Calendar grid</a></h1>

    <h3>No templates (simple interpolation)</h3>

    <h4>Non-nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridData"></cr-calendar-grid>

    <h4>Single Nest</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData"></cr-calendar-grid>

    <h4>Double Nest</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"></cr-calendar-grid>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoTemplatesComponent {

  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());

  constructor() { }
}
