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
 * Wrapper object to contain data and config.
 * Expectation: Additional fields will be required e.g. preferences, flags, etc.
 */
export interface CalendarGridData {
  rows: CalendarGridRow<any>[];
}

/**
 * A directive to wrap row labels that need to contain HTML markup or other directives.
 */
@Directive({selector: 'ng-template[crCalendarGridLabel]'})
export class CalendarGridLabelTplDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * Simple directive to add common styling
 */
@Directive({selector: 'cr-calendar-grid-label'})
export class CalendarGridLabelElmDirective {
  @HostBinding('class') class = 'col-2';
  // TODO is there a way to specify multiple styles (similar to class e.g. col d-flex p-0)
  @HostBinding('style.display') display = 'inline-block';
  // TODO remove, only used for testing
  // @HostBinding('style.border') border = '1px solid red';
  constructor() { }
}

/**
 * A directive to wrap content to be displayed in a cell.
 */
@Directive({selector: 'ng-template[crCalendarGridCell]'})
export class CalendarGridCellTplDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'cr-calendar-grid-cell',
  template: `
    <!-- TODO is there another way?
    Not crazy about client content wrapped in div, wrapped in cr-calendar-grid-cell. Can we remove a level? -->
    <div class="flex-grow-1 calendar-grid-cell">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .calendar-grid-cell {
      // border: 1px solid blue;
      text-align: center;
      // https://stackoverflow.com/questions/25066214/flexbox-not-giving-equal-width-to-elements/25066844#25066844
      flex-basis: 0;
    },
  `]
})
export class CalendarGridCellComponent {
  @HostBinding('class') class = 'col d-flex p-0';
  constructor() { }
}

/**
 * A directive representing an individual row.
 * TODO how can we apply?
 * :not(:last-child) {
 *    border-bottom: 1px solid #d2d2d2;
 * }
 * Right now, cr-calendar-grid is applying it.
 * What is the most common use case?
 * As grid view without last border-bottom, or calendar view with border-bottom?
 */
@Directive({selector: 'cr-calendar-grid-row'})
export class CalendarGridRowDirective implements AfterContentChecked {
  @HostBinding('class.row') apply: boolean = true;
  // @HostBinding('style.border-bottom') borderBottom = '1px solid #d2d2d2';
  // :not(:last-child) {
  //     border-bottom: 1px solid #d2d2d2;
  //   }
  // @HostBinding('style.border-bottom') borderBottom = '1px solid #d2d2d2'; // SUCCESS
  // @HostBinding('style.border-bottom: 1px solid rgb(210, 210, 210);') borderBottom = true; // FAIL
  // @HostBinding('style') borderBottom = 'border-bottom: 1px solid rgb(210, 210, 210);'; // FAIL
  // @HostBinding('style.:not(:last-child).border-bottom') borderBottom = '1px solid #d2d2d2'; // fAIL
  // @HostBinding(':not(:last-child).style.border-bottom') borderBottom = '1px solid #d2d2d2'; // FAIL

  labelTpl: CalendarGridLabelTplDirective | null;
  cellTpl: CalendarGridCellTplDirective | null;

  @ContentChildren(CalendarGridLabelTplDirective, {descendants: false}) labelTpls: QueryList<CalendarGridLabelTplDirective>;
  @ContentChildren(CalendarGridCellTplDirective, {descendants: false}) cellTpls: QueryList<CalendarGridCellTplDirective>;

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
  selector: 'cr-calendar-grid-row',
  template: `
    <ng-content select="cr-calendar-grid-label"></ng-content>
    <ng-content></ng-content>
  `,
  styles: [`
    :host:not(:last-child) {
     border-bottom: 1px solid #d2d2d2;
    }
  `]
})
export class CalendarGridRowComponent {
  @HostBinding('class') row = 'row';
  constructor() { }
}

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'cr-calendar-grid',
  template: `
    <cr-calendar-grid-row *ngFor="let calendarGridRow of calendarGridData.rows; let i = index" class="calendar-grid-row">

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
    .calendar-grid-row:not(:last-child) {
      border-bottom: 1px solid #d2d2d2;
    }
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

  labelTpl(index: number): CalendarGridLabelTplDirective | null {
    let labelTpl: CalendarGridLabelTplDirective | null;
    if (this.rows && this.rows.length === 1) {
      labelTpl = this.rows.first.labelTpl;
    } else if (this.rows && this.rows.length > 1) {
      const row = this.rows.find((row, idx, rows) => idx === index);
      labelTpl = row ? row.labelTpl : this.rows.last.labelTpl;
    }
    return labelTpl;
  }

  cellTpl(index: number): CalendarGridCellTplDirective | null {
    let cellTpl: CalendarGridCellTplDirective | null;
    if (this.rows && this.rows.length === 1) {
      cellTpl = this.rows.first.cellTpl;
    } else if (this.rows && this.rows.length > 1) {
      const row = this.rows.find((row, idx, rows) => idx === index);
      cellTpl = row ? row.cellTpl : this.rows.last.cellTpl;
    }
    return cellTpl;
  }
}
