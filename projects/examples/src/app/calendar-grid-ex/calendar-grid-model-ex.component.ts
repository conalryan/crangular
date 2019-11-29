import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarGridData } from 'projects/crangular/src/lib/calendar-grid/calendar-grid';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows } from './calendar-grid-data.stub';

@Component({
  selector: 'cr-calendar-grid-model-ex',
  template: `
    <h3>Model</h3>
  `,
  styles: [`
    
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarGridModelExComponent {
  
  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());

  constructor() { }
}