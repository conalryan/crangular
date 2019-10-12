import { Component } from '@angular/core';
import { CalendarGridData } from '../../../../crangular/src/lib/calendargrid/calendargrid';
import { calendarGridData, calendarGridNestedData, calendarGridDoubleNestedData } from './calendar-grid-data.stub';

@Component({
  selector: 'excr-calendargrid',
  template: `
    <h2>Calendar Grid Wrapper</h2>

    <!--<h4>No templates (use with primitive value)</h4>
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
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>-->

    <br/><br/>

    <!--<h3>Nested Data: Row 1 single, Row 2 one nest, Row 3 two level nest</h3>
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
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>-->

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
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          <span *ngIf="c?.value">TRUE</span>
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>
  `,
  styles: [`

  `]
})
export class ExCalendargridComponent {

  calendarGridData: CalendarGridData = calendarGridData();

  calendarGridNestedData: CalendarGridData = calendarGridNestedData();

  calendarGridDoubleNestedData: CalendarGridData = calendarGridDoubleNestedData();

  constructor() { }
}
