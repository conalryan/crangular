import { ChangeDetectionStrategy, Component, ContentChildren, Directive, HostBinding, Input, OnChanges, QueryList, TemplateRef } from '@angular/core';
import { BitMask, clearBit, getBit, prevSetBit, setBit } from '../bits/bits';

/***********************************************************************
 * Calendar grid
 * - Based on [NgbTab](https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/tabset/tabset.ts)
 * - NgbTabTitle    ~   CalendarGridLabelTplDirective
 * - NgbTabContent  ~   CalendarGridCellTplDirective
 * - NgbTab         ~   CalendarGridRowDirective
 * - NgbTabset      ~   CalendarGridComponent
 ************************************************************************/

let nextId = 0;

/**
 * A directive to wrap content to be displayed as the row label.
 * Exposes TemplateRef that can be used to project content.
 */
@Directive({selector: 'ng-template[crCalendarGridLabel]'})
export class CalendarGridLabelTplDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * Simple element directive to add common styling
 */
@Directive({selector: 'cr-calendar-grid-label'})
export class CalendarGridLabelElmDirective {
  // NOTE: List classes individually rather than combined e.g. @HostBinding('class') class = 'row mr-o ml-0';
  // Listing individually allows client to add classes @see CalendarGridComponent styles
  @HostBinding('class.col-2') col = 'col-2';
  constructor() {}
}

/**
 * A directive to wrap content to be displayed in a cell.
 * Exposes TemplateRef that can be used to project content.
 */
@Directive({selector: 'ng-template[crCalendarGridCell]'})
export class CalendarGridCellTplDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * A directive representing an individual row.
 * Adds common styling and exposes label and cell templates.
 */
@Directive({selector: 'cr-calendar-grid-row'})
export class CalendarGridRowDirective implements OnChanges {
  /**
   * The row identifier.
   * Must be unique for the entire document for proper accessibility support.
   */
  @Input() id: string; // = `cr-row-${nextId++}`;
  // NOTE: List classes individually rather than combined e.g. @HostBinding('class') class = 'row mr-o ml-0';
  // Listing individually allows client to add classes @see CalendarGridComponent styles
  @HostBinding('class.row') row = 'row';
  @HostBinding('class.mr-0') mr = 'mr-0';
  @HostBinding('class.ml-0') ml = 'ml-0';


  // @HostBinding('attr.id') attrId; // this.id; // FAIL: Does not apply based on input, rather it applies static string.

  // WORKS: produces id="true"
  // @HostBinding('attr.id') @Input() active = true;

  // FAIL
  // @HostBinding('attr.id') @Input() id;
  @HostBinding('attr.id')
  public get getId(): string {
    console.log(`[getId]: ${this.id}`);
  return this.id;
}

  @ContentChildren(CalendarGridLabelTplDirective, {descendants: false}) labelTpls: QueryList<CalendarGridLabelTplDirective>;
  @ContentChildren(CalendarGridCellTplDirective, {descendants: false}) cellTpls: QueryList<CalendarGridCellTplDirective>;

  ngOnChanges(): void {
    console.log('[OnChanges');
    // this.attrId = 'ha'; // this.id;
    console.log(this.id);
    // console.log(this.attrId);
  }
}

/**
 * Component that wraps client content and applies common styling to create equal sized columns.
 */
@Component({
  selector: 'cr-calendar-grid-cell',
  template: `
    <div class="flex-grow-1 calendar-grid-cell">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .calendar-grid-cell {
      text-align: center;
      flex-basis: 0;
    }
  `]
})
export class CalendarGridCellComponent {
  // NOTE: List classes individually rather than combined e.g. @HostBinding('class') class = 'row mr-o ml-0';
  // Listing individually allows client to add classes @see CalendarGridComponent styles
  @HostBinding('class.col') col = 'col';
  @HostBinding('class.d-flex') dflex = 'd-flex';
  @HostBinding('class.pl-2') pl = 'pl-2';
  @HostBinding('class.pr-2') pr = 'pr-2';
  constructor() { }
}

// ------------------------------------------ Interface ------------------------------------------

export interface CalendarGridCell<T> {
  id: string;
  date: Date;
  value: T;
}

export interface CalendarGridRow<T> {
  label: string;
  cells: CalendarGridCell<T>[];
  node?: CalendarGridRow<any>; // <any> Least restrictive: If it's nested it might be a different shape.
}

/**
 * Wrapper object to contain data, config, flags, etc.
 */
export interface CalendarGridData {
  rows: CalendarGridRow<any>[];
  visibleRows: BitMask;
  parentRows: BitMask;
}

export const calendarGridDataInstance = (calendarGridRows: CalendarGridRow<any>[]): CalendarGridData  => {
  return {
    rows: calendarGridRows,
    visibleRows: [0],
    parentRows: [0]
  };
};

export const flattenRows = (calendarGridData: CalendarGridData): CalendarGridRow<any>[] => {
  const rows: CalendarGridRow<any>[] = [];
  if (calendarGridData && calendarGridData.rows) {
    let totalIndex = 0;
    calendarGridData.rows.forEach((row, index, array) => {
      // Parent Row
      rows.push(row);
      setBit(calendarGridData.visibleRows, totalIndex);
      setBit(calendarGridData.parentRows, totalIndex);
      totalIndex++;
      // Loop nested rows (i.e. children and grandchildren...)
      let node = row.node;
      while (node) {
        rows.push(node);
        totalIndex++;
        node = node.node;
      }
    });
  }
  return rows;
};

export const isRowVisible = (calendarGridData: CalendarGridData, index: number): boolean => {
  return getBit(calendarGridData.visibleRows, index) === 1;
};

/**
 * Adding a row is quick, check if the row is visible, if not, add it and exit.
 * Closing rows requires checking if there are any children that also need to be closed.
 */
export const toggleRowVisibility = (calendarGridData: CalendarGridData, calendarGridRow: CalendarGridRow<any>, index: number): void => {
  // Expand a child row (i.e. ++index)
  if (!isRowVisible(calendarGridData, ++index)) {
    setBit(calendarGridData.visibleRows, index);
    return;  // Nothing else to do, exit.
  }
  // Collapse all child rows
  let node: CalendarGridRow<any> = calendarGridRow.node;
  while (node) {
    // Collapse this row, then increment the index (i.e. index++)
    clearBit(calendarGridData.visibleRows, index++);
    node = node.node;
  }
};

// ---------------------------------------- CalendarGrid -----------------------------------------

@Component({
  selector: 'cr-calendar-grid',
  template: `
  <!--[id]="calendarGridRow.id"-->
    <ng-container *ngFor="let calendarGridRow of allCalendarGridRows; let i = index">
      <cr-calendar-grid-row [id]="row(i).id" *ngIf="isRowVisible(calendarGridData, i)" class="calendar-grid-row">

        <cr-calendar-grid-label class="pr-2 calendar-grid-label" [ngStyle]="{'padding-left': paddingOffset(i)}">
          <span *ngIf="calendarGridRow.node && !isRowVisible(calendarGridData, i + 1)"
            class="pr-2"
            (click)="toggleRowVisibility(calendarGridData, calendarGridRow, i)">O
          </span>
          <span *ngIf="calendarGridRow.node && isRowVisible(calendarGridData, i + 1)"
            class="pr-2"
            (click)="toggleRowVisibility(calendarGridData, calendarGridRow, i)">X
          </span>
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class CalendarGridComponent implements OnChanges {

  @Input() calendarGridData: CalendarGridData;

  @ContentChildren(CalendarGridRowDirective) rows: QueryList<CalendarGridRowDirective>;

  allCalendarGridRows: CalendarGridRow<any>[];

  isRowVisible = isRowVisible;

  toggleRowVisibility = toggleRowVisibility;

  constructor() {}

  ngOnChanges(): void {
    this.allCalendarGridRows = flattenRows(this.calendarGridData);
  }

  row(index: number): CalendarGridRowDirective {
    let row: CalendarGridRowDirective;
    if (this.rows && this.rows.length === 1) {
      // Client is iterating over a single row
      row = this.rows.first;
    } else if (this.rows && this.rows.length > 1) {
      // Find the parent row that matches the row offset else default to the last row
      const parentOffset = prevSetBit(this.calendarGridData.parentRows, index);
      row = this.rows.find((row, idx, rows) => {
        return idx === parentOffset;
      }) || this.rows.last;
    }
    return row;
  }

  template(index: number, templates: string): CalendarGridLabelTplDirective | CalendarGridCellTplDirective | null {
    let template: CalendarGridLabelTplDirective | CalendarGridCellTplDirective | null;
    const row = this.row(index);
    if (row) {
      if (row[templates].length === 1) {
        // Client is iterating over a single template
        template = row[templates].first;
      } else {
        // Find the template that matches the row offset
        // (e.g. a row with 2 labels, will have 1 for parent row and 1 for nested row(s))
        // else default to the last template.
        const parentOffset = prevSetBit(this.calendarGridData.parentRows, index);
        template = row[templates].find((item, idx, array) => {
          return idx === parentOffset;
        }) || row[templates].last;
      }
    }
    return template;
  }

  /**
   * Apply padding based on the offset from the parent.
   * ex.
   * parentRow
   *   childRow
   *     grandChildRow
   */
  paddingOffset(index: number): string {
    const parentOffset = prevSetBit(this.calendarGridData.parentRows, index);
    return `${parentOffset}rem`;
  }
}
