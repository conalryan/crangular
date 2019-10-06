import { Component } from '@angular/core';

@Component({
  selector: 'cr-calendar-grid-ex',
  template: `
    <h2>Calendar Grid</h2>
    <ul>
      <li><a [routerLink]="['/calendar-grid/parts']">Parts</a></li>
      <li><a [routerLink]="['/calendar-grid/no-templates']">No templates</a></li>
      <li><a [routerLink]="['/calendar-grid/single-template']">Single template</a></li>
      <li><a [routerLink]="['/calendar-grid/single-template-per-level']">Single template per Level</a></li>
      <li><a [routerLink]="['/calendar-grid/template-per-row']">Template per Row</a></li>
      <li><a [routerLink]="['/calendar-grid/template-per-parent']">Template per Parent</a></li>
    </ul>
  `
})
export class CalendarGridExComponent {
  constructor() {}
}
