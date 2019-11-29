import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarGridData } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows } from './calendar-grid-data.stub';

@Component({
  selector: 'cr-no-templates',
  template: `
    <h3>No templates (simple interpolation)</h3>

    <h4>Non-nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridData"></cr-calendar-grid>
    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridData"&gt;&lt;/cr-calendar-grid&gt;
      </code>
    </pre>

    <h4>Single Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData"></cr-calendar-grid>
    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridNestedData"&gt;&lt;/cr-calendar-grid&gt;
      </code>
    </pre>

    <h4>Double Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"></cr-calendar-grid>
    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"&gt;&lt;/cr-calendar-grid&gt;
      </code>
    </pre>
  `,
  styles: [`
    h4 {
      margin-top: 2rem;
    }
    pre {
      background-color: #d2d2d2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoTemplatesComponent {

  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());

  constructor() { }
}
