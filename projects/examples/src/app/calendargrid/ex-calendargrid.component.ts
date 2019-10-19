import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarGridData, CalendarGridDataClass } from '../../../../crangular/src/lib/calendargrid/calendargrid';
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

    <!--<br/><br/>

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
    </cr-calendar-grid>-->

    <br/><br/>

    <h3>Double Nested Data: Experimenting with multi label/cells per row</h3>

    <h4 style="background-color:blue">Two labels per row</h4>
    <h4 [ngStyle]="{'color': 'blue'}">Two labels per row</h4>
    <h4 class="blue-it">Two labels per row</h4>
    <br/><br/>

    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">

      <!--<cr-calendar-grid-row style="border: 1px solid blue">-->
      <!--<cr-calendar-grid-row [ngStyle]="{'color': 'blue'}">-->
      <!--<cr-calendar-grid-row id="blue-it">-->
      <!--<cr-calendar-grid-row class="blue-it">-->
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          <span>First: {{ l }}</span>
        </ng-template>

        <ng-template crCalendarGridLabel let-l="label">
          <span>Second: {{ l }}</span>
        </ng-template>

        <ng-template crCalendarGridCell let-c="cell">
          {{ c?.value }}
        </ng-template>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <br/><br/>

    <!--<h4>Template for each row</h4>
    <br/><br/>
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


    <h4>Template for each row Calendar Grid Class</h4>
    <br/><br/>
    <cr-calendar-grid-class [calendarGridData]="calendarGridDoulbeNestedDataClass">
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
    </cr-calendar-grid-class>-->
  `,
  styles: [`
    #blue-it {
      color: blue;
    }
    .blue-it {
      color: blue;
    }
    .calendar-grid-row {
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

  constructor() {
    // console.log(this.calendarGridDoubleNestedData);
    // console.log(this.calendarGridDoulbeNestedDataClass);
   }
}
