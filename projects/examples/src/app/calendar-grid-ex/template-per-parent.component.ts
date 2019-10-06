import { CalendarGridData } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows } from './calendar-grid-data.stub';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cr-template-per-parent',
  template: `
    <h1><a [routerLink]="['/calendar-grid']">Calendar grid</a></h1>

    <h3>Template per Parent</h3>

    <h4>Single Nest</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          1️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🌮 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          2️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏄‍♀️ {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          3️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          ⚽ {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <h4>Double Nest</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          1️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🌮 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          2️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏄‍♀️ {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          3️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          ⚽ {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <h4>Double Nest (Parent template, Child template)</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          1️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🌮 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            2️⃣ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🍭 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          4️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🎪‍ {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            5️⃣ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            ⚽ {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          7️⃣ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          ⛺ {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            8️⃣ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🏢 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>
    </cr-calendar-grid>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePerParentComponent {

  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());

  constructor() { }
}
