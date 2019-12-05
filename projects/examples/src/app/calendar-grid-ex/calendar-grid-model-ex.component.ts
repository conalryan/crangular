import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarGridData } from 'projects/crangular/src/lib/calendar-grid/calendar-grid';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows } from './calendar-grid-data.stub';

@Component({
  selector: 'app-calendar-grid-model-ex',
  template: `
    <h3>Interfaces</h3>
    <pre>
      <code>
        export interface CalendarGridCell&lt;T&gt; &#123;
          label: string;
          date: Date;
          value: T;
        &#125;
        
        export interface CalendarGridRow&lt;T&gt; &#123;
          label: string;
          cells: CalendarGridCell&lt;T&gt;[];
          nodes?: CalendarGridRow&lt;any&gt;[];
        &#125;
      </code>
    </pre>

    <h3>Calendar grid data class (aka the brain)</h3>
    <p>You must pass an instance of CalendarGridData class into cr-calendar-grid component</p>
    <p>You must pass an array of CalendarGirdRow to the CalendarGridData constructor</p>
    <p>To create rows, either create data using the interfaces or use the static methods CalendarGridData.cells and CalendarGridData.row respectively (examples below)</p>
    <pre>
      <code>
        export class CalendarGridData &#123;
          static cells = &lt;T&gt;(label: string, startDate: Date, numDays?: number, data?: T[]): CalendarGridCell&lt;T&gt;[];
        
          static row = &lt;T&gt;(label: string, startDate: Date, numDays?: number, data?: T[]): CalendarGridRow&lt;T&gt;;
        
          constructor(calendarGridRows: CalendarGridRow&lt;any&gt;[]);
        
          get rowsRaw(): CalendarGridRow&lt;any&gt;[];
        
          get rows(): CalendarGridRow&lt;any&gt;[];
        
          get visibleRows(): BitMask;
        
          get parentRows(): BitMask;
        
          index(calendarGridRow: CalendarGridRow&lt;any&gt;): number;
        
          isRowVisible(index: number): boolean;
        
          toggleRowVisibility(index: number): void;
        
          toggleNodesVisibility(index: number): void;
        
          levels(index: number): number[];
        &#125;
      </code>
    </pre>

    <h5>Generate emtpy cells from start date and number of days</h5>
    <pre>
      <code>
        const cellsFromRange = CalendarGridData.cells('Codes', new Date(2019, 11, 1, 12), 7);
      </code>
    </pre>

    <h5>Generate cells from array of data</h5>
    <pre>
      <code>
        const cellsFromData = CalendarGridData.cells('Codes', new Date(2019, 11, 1, 12), null, ['AB', 'CD', 'EF']);
      </code>
    </pre>

    <h5>Generate row with emtpy cells from start date and number of days</h5>
    <pre>
      <code>
        const rowFromRange = CalendarGridData.row('Codes', new Date(2019, 11, 1, 12), 7);
      </code>
    </pre>

    <h5>Generate cells from array of data</h5>
    <pre>
      <code>
        const rowFromData = CalendarGridData.row('Codes', new Date(2019, 11, 1, 12), null, ['AB', 'CD', 'EF']);
      </code>
    </pre>

  `,
  styles: [`
    h3, h5 {
      margin-top: 2rem;
    }
    pre {
      background-color: #d2d2d2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarGridModelExComponent {
  
  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());

  constructor() { }
}