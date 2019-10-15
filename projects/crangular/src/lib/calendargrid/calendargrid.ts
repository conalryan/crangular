import { Component, ContentChildren, Directive, HostBinding, Input, OnChanges, QueryList, TemplateRef } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

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
  @HostBinding('class') class = 'col-2 pl-2 pr-2';
  constructor() {}
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
    <!-- TODO better alternative?
    Not crazy about client content wrapped in div, wrapped in cr-calendar-grid-cell. Can we remove a level?
    Note: css classes on div and host -->
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
  @HostBinding('class') class = 'col d-flex pl-2 pr-2';
  // TODO can we inject the calendarGridCellData model here to calculate .weekend?
  constructor() { }
}

/**
 * A directive representing an individual row.
 */
@Directive({selector: 'cr-calendar-grid-row'})
export class CalendarGridRowDirective {
  @HostBinding('class') row = 'row mr-0 ml-0';
  @ContentChildren(CalendarGridLabelTplDirective, {descendants: false}) labelTpls: QueryList<CalendarGridLabelTplDirective>;
  @ContentChildren(CalendarGridCellTplDirective, {descendants: false}) cellTpls: QueryList<CalendarGridCellTplDirective>;
}

@Component({
  selector: 'cr-calendar-grid',
  template: `
    <ng-container *ngFor="let calendarGridRow of allCalendarGridRows; let i = index">

      <cr-calendar-grid-row *ngIf="isRowVisible(i)" class="calendar-grid-row" [ngStyle]="{'padding-left': paddingOffset(i)}">

        <cr-calendar-grid-label>
          <span *ngIf="calendarGridRow.node && !isRowVisible(i + 1)" class="pr-2" (click)="toggleRowVisibility(i + 1)">O</span>
          <span *ngIf="calendarGridRow.node && isRowVisible(i + 1)" class="pr-2" (click)="toggleRowVisibility(i + 1)">X</span>

          <ng-container *ngIf="!template(i, 'labelTpls')">{{ calendarGridRow.label }}</ng-container>
          <ng-container *ngTemplateOutlet="template(i, 'labelTpls')?.templateRef;context:{label:calendarGridRow.label}"></ng-container>
        </cr-calendar-grid-label>

        <cr-calendar-grid-cell *ngFor="let calendarCell of calendarGridRow.cells">
          <ng-container *ngIf="!template(i, 'cellTpls')">{{ calendarCell.value }}</ng-container>
          <ng-container *ngTemplateOutlet="template(i, 'cellTpls')?.templateRef;context:{cell:calendarCell}"></ng-container>
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
  rowIndexMap = new Map<number, {parent: number, offset: number}>();
  // TODO change to bitmask to be more efficient as number is 64bit precision.
  visibleRows: Set<number>;

  constructor(/* config: CrCalendarGridConfig */) {
    // this.type = config.type;
  }

  ngOnChanges(): void {
    this.visibleRows = new Set<number>();
    this.allCalendarGridRows = this.allRows(this.calendarGridData);
  }

  allRows(calendarGridData: CalendarGridData): CalendarGridRow<any>[] {
    const rows: CalendarGridRow<any>[] = [];
    if (calendarGridData && calendarGridData.rows) {

      let totalIndex = 0;
      calendarGridData.rows.forEach((row, index, array) => {
        let offsetFromParent = 0;
        rows.push(row);
        this.visibleRows.add(totalIndex);
        this.rowIndexMap.set(totalIndex, {parent: index, offset: offsetFromParent});
        totalIndex++;

        let node = row.node;
        while (node) {
          offsetFromParent++;
          rows.push(node);
          // Intentional: Don't add nested rows to this.visibleRows. By default they will be closed/collapsed
          this.rowIndexMap.set(totalIndex, {parent: index, offset: offsetFromParent});
          totalIndex++;
          node = node.node;
        }
      });
    }
    return rows;
  }

  isRowVisible(index: number): boolean {
    return this.visibleRows.has(index);
  }

  /**
   * Adding a row is quick, check if the row is visible, if not, add it and exit.
   * Closing rows requires checking if there are any children that also need to be closed.
   */
  toggleRowVisibility(index: number): void {

    // Expand a row
    if (!this.visibleRows.has(index)) {
      this.visibleRows.add(index);
      return;  // Nothing else to do, exit.
    }

    // Collapse a row and it's children
    const rowMap = this.rowIndexMap.get(index);
    // Loop rows to find the same parent and parentOffset > rowMap.offset (i.e. if the offset is bigger it's a child);
    this.rowIndexMap.forEach((value, key, map) => {
      if (key === index || (key > index && rowMap.parent === value.parent)) {
        if (this.visibleRows.has(key)) {
          this.visibleRows.delete(key);
        }
      }
    });
  }

  row(index: number): CalendarGridRowDirective {
    let row: CalendarGridRowDirective;
    if (this.rows && this.rows.length === 1) {
      // Client is iterating over a row
      row = this.rows.first;
    } else if (this.rows && this.rows.length > 1) {
      // Find the parent row that matches the index or default to the last row
      row = this.rows.find((row, idx, rows) => this.rowIndexMap.get(index) && idx === this.rowIndexMap.get(index).parent) || this.rows.last;
    }
    return row;
  }

  template(index: number, templates: string): CalendarGridLabelTplDirective | CalendarGridCellTplDirective | null {
    let template: CalendarGridLabelTplDirective | CalendarGridCellTplDirective | null;
    const row = this.row(index);
    if (row[templates].length === 1) {
      // Client is iterating over a single template
      template = row[templates].first;
    } else {
      // Find the template that matches the row offset (e.g. a row with 2 labels, will have 1 for header row and 1 for nested row)
      template = row[templates].find((item, idx, array) => {
        return idx === (this.rowIndexMap.get(index) && this.rowIndexMap.get(index).offset) || row[templates].last;
      });
    }
    return template;
  }

  paddingOffset(index: number): string {
    const parentOffset = this.rowIndexMap.get(index).offset;
    return `${parentOffset}rem`;
  }
}
