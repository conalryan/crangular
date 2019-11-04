import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { strCells } from './calendar-grid-data.stub';

@Component({
  selector: 'cr-parts',
  template: `
    <h1><a [routerLink]="['/calendar-grid']">Calendar grid</a></h1>

    <h3>Parts</h3>

    <cr-calendar-grid-row>Inside a row</cr-calendar-grid-row>

    <br/>

    <cr-calendar-grid-label>Inside a label</cr-calendar-grid-label>

    <br/>

    <cr-calendar-grid-cell>Inside a Cell</cr-calendar-grid-cell>

    <br/>

    <cr-calendar-grid-row>
      <cr-calendar-grid-label>Inside a label</cr-calendar-grid-label>
      <cr-calendar-grid-cell>Inside a Cell 1</cr-calendar-grid-cell>
      <cr-calendar-grid-cell>Inside a Cell 2</cr-calendar-grid-cell>
      <cr-calendar-grid-cell>Inside a Cell 3</cr-calendar-grid-cell>
      <cr-calendar-grid-cell>Inside a Cell 4</cr-calendar-grid-cell>
    </cr-calendar-grid-row>

    <br/>

    <cr-calendar-grid-row>
      <cr-calendar-grid-label>label then loop cells</cr-calendar-grid-label>
      <cr-calendar-grid-cell *ngFor="let cell of cells">
        {{cell}}
      </cr-calendar-grid-cell>
    <cr-calendar-grid-row>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartsComponent implements OnInit {

  cells = ['one', 'two', 'three', 'four'];

  constructor() { }

  ngOnInit() {
  }

}
