import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarGridData, CalendarGridDataClass } from '../../../../crangular/src/lib/calendargrid/calendargrid';
import { calendarGridData, calendarGridNestedData, calendarGridDoubleNestedData } from './calendar-grid-data.stub';

@Component({
  selector: 'excr-calendargrid',
  template: `
    <h2>Calendar Grid Wrapper</h2>

    <h4>No templates (use with primitive value)</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridData"></cr-calendar-grid>
    <br/><br/>

    <h4>Single template for all rows</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h4>Template for each row</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr1 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr1 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr2 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr2 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr3 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr3 <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h3>Single Nested Data</h3>

    <h4>No templates (use with primitive value)</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData"></cr-calendar-grid>
    <br/><br/>

    <h4>Single template for all rows</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h4>Template for each row</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr1 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr1 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr2 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr2 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr3 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr3 <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h3>Double Nested Data</h3>

    <h4>No templates (use with primitive value)</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"></cr-calendar-grid>
    <br/><br/>

    <h4>Single template for all rows</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h4>Template for each row</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr1 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr1 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr2 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr2 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr3 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr3 <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h3>Double Nested Data: Multi label/cells per row</h3>

    <h4>Two labels per row</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr1 a <span>First: {{ l }}</span>
        </ng-template>

        <ng-template crCalendarGridLabel let-l="label">
          lr1 b <span>Second: {{ l }}</span>
        </ng-template>

        <ng-template crCalendarGridCell let-c="cell">
          cr1 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h4>Template for each row</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr1 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr1 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr2 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr2 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr3 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr3 <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <h4>Template for each row Calendar Grid Class</h4>
    <cr-calendar-grid-class [calendarGridData]="calendarGridDoulbeNestedDataClass">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr1 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr1 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr2 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr2 {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          lr3 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          cr3 <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid-class>
  `,
  styles: [`
    #blue-it {
      color: blue;
    }
    .blue-it {
      color: blue;
    }
    // cr-calendar-grid-label:nth-of-type(1) {
    //   background-color: #d2d2d2;
    // }
    // .calendar-grid-label:nth-of-type(2) {
    //   background-color: #d2d2d2;
    // }
    .calendar-grid-row:nth-of-type(2) .calendar-grid-label {
      background-color: #d2d2d2;
    }
    // cr-calendar-grid-label.calendar-grid-label {
    //   background-color: #d2d2d2;
    // }
    .calendar-grid-row:nth-of-type(1) {
      background-color: red;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ExCalendargridComponent {

  calendarGridData: CalendarGridData = calendarGridData();

  calendarGridNestedData: CalendarGridData = calendarGridNestedData();

  calendarGridDoubleNestedData: CalendarGridData = calendarGridDoubleNestedData();

  calendarGridDoulbeNestedDataClass: CalendarGridDataClass = new CalendarGridDataClass(calendarGridDoubleNestedData().rows);

  constructor() {}
}
