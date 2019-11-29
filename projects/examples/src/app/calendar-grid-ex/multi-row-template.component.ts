import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarGridData } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows } from './calendar-grid-data.stub';

@Component({
  selector: 'cr-mult-row-template',
  template: `
    <h3>Multi row/template</h3>

    <h4>Non-nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🔖 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🚐 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          📜 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🛫 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <h4>Single Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🔖 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🚐 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          📜 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🛫 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <h4>Double Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🔖 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🚐 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          📜 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🛫 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridData"&gt;
          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🏷️ &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🏨 &#123; c?.value &#125;&lt;/ng-template&gt;
          &lt;/cr-calendar-grid-row&gt;

          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🔖 &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🚐 &#123; c?.value &#125;&lt;/ng-template&gt;
          &lt;/cr-calendar-grid-row&gt;

          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;📜 &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🛫 &#123; c?.value &#125;&lt;/ng-template&gt;
          &lt;/cr-calendar-grid-row&gt;
        &lt;/cr-calendar-grid&gt;
      </code>
    </pre>
  `,
  styles: [`
    h4 {
      margin-top: 2rem;
    }
    pre {
      background-color: #d2d2d2;
      margin-top: 2rem;
    }
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiRowTemplateComponent {

  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());

  constructor() { }
}
