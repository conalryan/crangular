import { Component } from '@angular/core';
import { CalendarGridData } from '../../../../crangular/src/lib/calendargrid/calendargrid';
import { calendarGridData } from './calendar-grid-data.stub';

@Component({
  selector: 'excr-calendargrid',
  template: `
    <h2>Calendar Grid Wrapper</h2>

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

    <hr/>

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
    </cr-calendar-grid>
  `,
  styles: [`

  `]
})
export class ExCalendargridComponent {

  calendarGridData: CalendarGridData = calendarGridData();

  constructor() { }
}