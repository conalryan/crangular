import { AfterContentChecked, Component, ContentChildren, Directive, Input, QueryList, TemplateRef, HostBinding } from '@angular/core';

export interface CalendarGridCell<T> {
  id: string;
  date: Date;
  value: T;
}
export interface CalendarGridRow<T> {
  label: string;
  cells: CalendarGridCell<T>[];
  node: CalendarGridRow<any>; // <any> Least restrictive: If it's nested it might be a different shape.
}

/**
 * Returns a single rows property (for now).
 * Expectation: Additional fields will be required e.g. preferences, flags, etc.
 */
export interface CalendarGridData {
  rows: CalendarGridRow<any>[];
}

/**
 * A directive to wrap tab titles that need to contain HTML markup or other directives.
 *
 * Alternatively you could use the `NgbTab.title` input for string titles.
 */
@Directive({selector: 'ng-template[crCalendarGridLabel]'})
export class CalendarGridLabelDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * A directive to wrap content to be displayed in a tab.
 */
@Directive({selector: 'ng-template[crCalendarGridCell]'})
export class CalendarGridCellDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * A directive representing an individual tab.
 */
@Directive({selector: 'cr-calendar-grid-row'})
export class CalendarGridRowDirective implements AfterContentChecked {

  labelTpl: CalendarGridLabelDirective | null;
  cellTpl: CalendarGridCellDirective | null;

  @ContentChildren(CalendarGridLabelDirective, {descendants: false}) labelTpls: QueryList<CalendarGridLabelDirective>;
  @ContentChildren(CalendarGridCellDirective, {descendants: false}) cellTpls: QueryList<CalendarGridCellDirective>;

  ngAfterContentChecked() {
    // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
    // only @ContentChildren allows us to specify the {descendants: false} option.
    // Without {descendants: false} we are hitting bugs described in:
    // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
    this.labelTpl = this.labelTpls.first;
    this.cellTpl = this.cellTpls.first;
  }
}

@Component({
  selector: 'cr-calendar-grid-label',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      // border: 1px solid red;
      display: inline-block;
    }
  `]
})
export class CalendarGridLabelComponent {

  @HostBinding('class.col-2') apply: boolean = true;

  constructor() { }
}

@Component({
  selector: 'cr-calendar-grid-cell',
  template: `
    <div class="flex-grow-1 calendar-grid-cell">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .calendar-grid-cell {
      //border: 1px solid blue;
      text-align: center;
      // https://stackoverflow.com/questions/25066214/flexbox-not-giving-equal-width-to-elements/25066844#25066844
      flex-basis: 0;
    }
  `]
})
export class CalendarGridCellComponent {

  @HostBinding('class.col') col: boolean = true;
  @HostBinding('class.d-flex') dFlex: boolean = true;
  @HostBinding('class.p-0') pl: boolean = true;

  constructor() { }
}

@Component({
  selector: 'cr-calendar-grid-row',
  template: `
    <ng-content select="cr-calendar-grid-label"></ng-content>
    <ng-content></ng-content>
  `,
  styles: [`
    // .calendar-grid-row:not(:last-child) {
    //   border-bottom: 1px solid #d2d2d2;
    // }
    :host:not(:last-child) {
      border-bottom: 1px solid #d2d2d2;
    }
    :host {
      // border: 1px solid yellow;
    }
  `]
})
export class CalendarGridRowComponent {

  @HostBinding('class.row') apply: boolean = true;

  constructor() { }
}

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'cr-calendar-grid',
  template: `
    <cr-calendar-grid-row *ngFor="let calendarGridRow of calendarGridData.rows; let i = index">

      <cr-calendar-grid-label>
        <ng-container *ngIf="!labelTpl(i)">{{ calendarGridRow.label }}</ng-container>
        <ng-container *ngTemplateOutlet="labelTpl(i)?.templateRef;context:{label:calendarGridRow.label}"></ng-container>
      </cr-calendar-grid-label>

      <cr-calendar-grid-cell *ngFor="let calendarCell of calendarGridRow.cells">
        <ng-container *ngIf="!cellTpl(i)">{{ calendarCell.value }}</ng-container>
        <ng-container *ngTemplateOutlet="cellTpl(i)?.templateRef;context:{cell:calendarCell}"></ng-container>
      </cr-calendar-grid-cell>

    </cr-calendar-grid-row>
  `,
  styles: [`
    // .calendar-grid-row:not(:last-child) {
    //   border-bottom: 1px solid #d2d2d2;
    // }
    .weekend {
      background-color: #e8e8e8;
    }
  `]
})
export class CalendarGridComponent {

  @Input() calendarGridData: CalendarGridData;
  @ContentChildren(CalendarGridRowDirective) rows: QueryList<CalendarGridRowDirective>;

  constructor(/* config: NgbTabsetConfig */) {
    // this.type = config.type;
    // this.justify = config.justify;
    // this.orientation = config.orientation;
  }

  labelTpl(index: number): CalendarGridLabelDirective | null {
    let labelTpl: CalendarGridLabelDirective | null;
    if (this.rows && this.rows.length === 1) {
      labelTpl = this.rows.first.labelTpl;
    } else if (this.rows && this.rows.length > 1) {
      const row = this.rows.find((row, idx, rows) => idx === index);
      labelTpl = row ? row.labelTpl : this.rows.last.labelTpl;
    }
    return labelTpl;
  }

  cellTpl(index: number): CalendarGridCellDirective | null {
    let cellTpl: CalendarGridCellDirective | null;
    if (this.rows && this.rows.length === 1) {
      cellTpl = this.rows.first.cellTpl;
    } else if (this.rows && this.rows.length > 1) {
      const row = this.rows.find((row, idx, rows) => idx === index);
      cellTpl = row ? row.cellTpl : this.rows.last.cellTpl;
    }
    return cellTpl;
  }
}
