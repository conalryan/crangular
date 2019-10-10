import { AfterContentChecked, Component, ContentChildren, Directive, Input, QueryList, TemplateRef, HostBinding, OnChanges } from '@angular/core';

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
  @HostBinding('style.display') display = 'inline-block';
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
      text-align: center;
      flex-basis: 0;
    },
    .weekend {
      background-color: #e8e8e8;
    }
  `]
})
export class CalendarGridCellComponent {
  @HostBinding('class') class = 'col d-flex p-0';
  // TODO can we inject the calendarGridCellData model here to calculate .weekend?
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
export class CalendarGridRowDirective {
  // TODO calendar-grid-row class is not applied by cr-calendar-grid component when using: ('class') class = 'row';
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
  @ContentChildren(CalendarGridLabelTplDirective, {descendants: false}) labelTpls: QueryList<CalendarGridLabelTplDirective>;
  @ContentChildren(CalendarGridCellTplDirective, {descendants: false}) cellTpls: QueryList<CalendarGridCellTplDirective>;
}

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'cr-calendar-grid',
  template: `
    <ng-container *ngFor="let calendarGridRow of allCalendarGridRows; let i = index">

      <cr-calendar-grid-row *ngIf="isRowVisible(i)" class="calendar-grid-row">

        <span *ngIf="calendarGridRow.node && !isRowVisible(i)" class="ml-3" (click)="toggleRowVisibility(i)">O</span>
        <span *ngIf="calendarGridRow.node && isRowVisible(i)" class="ml-3" (click)="toggleRowVisibility(i)">X</span>

        <cr-calendar-grid-label>
          <ng-container *ngIf="!labelTpl(i)">{{ calendarGridRow.label }}</ng-container>
          <ng-container *ngTemplateOutlet="labelTpl(i)?.templateRef;context:{label:calendarGridRow.label}"></ng-container>
        </cr-calendar-grid-label>

        <cr-calendar-grid-cell *ngFor="let calendarCell of calendarGridRow.cells">
          <ng-container *ngIf="!cellTpl(i)">{{ calendarCell.value }}</ng-container>
          <ng-container *ngTemplateOutlet="cellTpl(i)?.templateRef;context:{cell:calendarCell}"></ng-container>
        </cr-calendar-grid-cell>

      </cr-calendar-grid-row>

    </ng-container>
  `,
  styles: [`
    .calendar-grid-row:not(:last-child) {
      border-bottom: 1px solid #d2d2d2;
    }
  `]
})
export class CalendarGridComponent implements OnChanges {

  @Input() calendarGridData: CalendarGridData;
  @ContentChildren(CalendarGridRowDirective) rows: QueryList<CalendarGridRowDirective>;
  allCalendarGridRows: CalendarGridRow<any>[];
  rowIndexMap = new Map<number, number>();
  // TODO change to bitmask to be more efficient.
  visibleRows: Set<number>;

  constructor(/* config: CrCalendarGridConfig */) {
    // this.type = config.type;
  }

  ngOnChanges(): void {
    this.visibleRows = new Set<number>();
    this.allCalendarGridRows = this.extractAllRows(this.calendarGridData);
  }

  extractAllRows(calendarGridData: CalendarGridData): CalendarGridRow<any>[] {
    const rows: CalendarGridRow<any>[] = [];
    if (calendarGridData && calendarGridData.rows) {

      let totalIndex = 0;
      calendarGridData.rows.forEach((row, index, array) => {
        rows.push(row);
        this.visibleRows.add(index);
        this.rowIndexMap.set(totalIndex, index);
        totalIndex++;

        let node = row.node;
        while (node) {
          rows.push(node);
          this.rowIndexMap.set(totalIndex, index);
          totalIndex++;
          node = node.node;
        }
      });
    }
    return rows;
  }

  isRowVisible(idx: number): boolean {
    return this.visibleRows.has(idx);
  }

  toggleRowVisibility(idx: number): void {
    if (this.visibleRows.has(idx)) {
      this.visibleRows.delete(idx);
    } else {
      this.visibleRows.add(idx);
    }
  }

  labelTpl(index: number): CalendarGridLabelTplDirective | null {
    let labelTpl: CalendarGridLabelTplDirective | null;
    if (this.rows && this.rows.length === 1) {
      const row = this.rows.first;
      // How do we find the correct label?
      // labelTpl = row.labelTpls.first;
      labelTpl = row.labelTpls.length === 1
        ? row.labelTpls.first
        : row.labelTpls.find((item, idx, array) => idx === this.rowIndexMap.get(index)) || row.labelTpls.last;
    } else if (this.rows && this.rows.length > 1) {
      const row = this.rows.find((row, idx, rows) => idx === this.rowIndexMap.get(index)) || this.rows.last;
      labelTpl = row.labelTpls.length === 1
        ? row.labelTpls.first
        : row.labelTpls.find((item, idx, array) => idx === this.rowIndexMap.get(index)) || row.labelTpls.last;
    }
    return labelTpl;
  }

  cellTpl(index: number): CalendarGridCellTplDirective | null {
    let cellTpl: CalendarGridCellTplDirective | null;
    if (this.rows && this.rows.length === 1) {
      const row = this.rows.first;
      // How do we find the correct label?
      // labelTpl = row.labelTpls.first;
      cellTpl = row.cellTpls.length === 1
        ? row.cellTpls.first
        : row.cellTpls.find((item, idx, array) => idx === this.rowIndexMap.get(index)) || row.cellTpls.last;
    } else if (this.rows && this.rows.length > 1) {
      const row = this.rows.find((row, idx, rows) => idx === this.rowIndexMap.get(index)) || this.rows.last;
      cellTpl = row.cellTpls.length === 1
        ? row.cellTpls.first
        : row.cellTpls.find((item, idx, array) => idx === this.rowIndexMap.get(index)) || row.cellTpls.last;
    }
    return cellTpl;
  }
}
