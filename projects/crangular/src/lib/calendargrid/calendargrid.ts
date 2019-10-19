import { Component, ContentChildren, Directive, HostBinding, Input, OnChanges, QueryList, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

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
export class CalendarGridRowDirective {
  // NOTE: List classes individually rather than combined e.g. @HostBinding('class') class = 'row mr-o ml-0';
  // Listing individually allows client to add classes @see CalendarGridComponent styles
  @HostBinding('class.row') row = 'row';
  @HostBinding('class.mr-0') mr = 'mr-0';
  @HostBinding('class.ml-0') ml = 'ml-0';
  @ContentChildren(CalendarGridLabelTplDirective, {descendants: false}) labelTpls: QueryList<CalendarGridLabelTplDirective>;
  @ContentChildren(CalendarGridCellTplDirective, {descendants: false}) cellTpls: QueryList<CalendarGridCellTplDirective>;
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

// -------------------------------------------- Model --------------------------------------------

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

// ------------------------------------------ Interface ------------------------------------------

/**
 * Wrapper object to contain data and config.
 * Expectation: Additional fields will be added/required e.g. preferences, flags, etc.
 */
export interface CalendarGridData {
  rows: CalendarGridRow<any>[];
  visibleRows: Set<number>;
}

// ---------------------------------------- Multi Input() ----------------------------------------

@Component({
  selector: 'cr-calendar-grid',
  template: `
    <ng-container *ngFor="let calendarGridRow of allCalendarGridRows; let i = index">
      <cr-calendar-grid-row *ngIf="isRowVisible(i)" class="calendar-grid-row">

        <cr-calendar-grid-label class="pr-2" [ngStyle]="{'padding-left': paddingOffset(i)}">
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarGridComponent implements OnChanges {

  @Input() calendarGridData: CalendarGridData;

  @ContentChildren(CalendarGridRowDirective) rows: QueryList<CalendarGridRowDirective>;

  allCalendarGridRows: CalendarGridRow<any>[];

  rowIndexMap = new Map<number, {parent: number, offset: number}>();

  constructor() {}

  ngOnChanges(): void {
    this.allCalendarGridRows = this.allRows(this.calendarGridData);
  }

  allRows(calendarGridData: CalendarGridData): CalendarGridRow<any>[] {
    const rows: CalendarGridRow<any>[] = [];
    if (calendarGridData && calendarGridData.rows) {
      let totalIndex = 0;
      calendarGridData.rows.forEach((row, index, array) => {
        // Parent Row
        let offsetFromParent = 0;
        rows.push(row);
        this.calendarGridData.visibleRows.add(totalIndex);
        this.rowIndexMap.set(totalIndex, {parent: index, offset: offsetFromParent});
        totalIndex++;
        // Loop nested rows (i.e. children and grandchildren...)
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
    return this.calendarGridData.visibleRows.has(index);
  }

  /**
   * Adding a row is quick, check if the row is visible, if not, add it and exit.
   * Closing rows requires checking if there are any children that also need to be closed.
   */
  toggleRowVisibility(index: number): void {
    // Expand a row
    if (!this.calendarGridData.visibleRows.has(index)) {
      this.calendarGridData.visibleRows.add(index);
      return;  // Nothing else to do, exit.
    }
    // Collapse a row and it's children
    const rowMap = this.rowIndexMap.get(index);
    // Loop rows to find the same parent and parentOffset > rowMap.offset (i.e. if the offset is bigger it's a child);
    this.rowIndexMap.forEach((value, key, map) => {
      if (key === index || (key > index && rowMap.parent === value.parent)) {
        if (this.calendarGridData.visibleRows.has(key)) {
          this.calendarGridData.visibleRows.delete(key);
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
      template = row[templates].find((item, idx, array) => idx === this.rowIndexMap.get(index).offset) || row[templates].last;
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
    const parentOffset = this.rowIndexMap.get(index).offset;
    return `${parentOffset}rem`;
  }
}

// ----------------------------------------- CLASS -----------------------------------------------

export class CalendarGridDataClass {
  rows: CalendarGridRow<any>[];
  allCalendarGridRows: CalendarGridRow<any>[];

  rowIndexMap: Map<number, {parent: number, offset: number}>;
  visibilitySet: Set<number>;

  parentMask: number[];
  visibilityMask: number[];

  constructor(rows: CalendarGridRow<any>[]) {
    this.rows = rows;

    this.rowIndexMap = new Map<number, {parent: number, offset: number}>();
    this.visibilitySet = new Set<number>();

    this.parentMask = [0];
    this.visibilityMask = [0];

    this.allCalendarGridRows = this.flatten();
  }

  flatten(): CalendarGridRow<any>[] {
    const rows: CalendarGridRow<any>[] = [];
    if (this.rows) {
      let totalIndex = 0;
      this.rows.forEach((row, index, array) => {
        // Parent Row
        let offsetFromParent = 0;
        rows.push(row);
        this.visibilitySet.add(totalIndex);
        this.rowIndexMap.set(totalIndex, {parent: index, offset: offsetFromParent});
        totalIndex++;
        // Loop nested rows (i.e. children and grandchildren...)
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
    return this.visibilitySet.has(index);
  }

  /**
   * Adding a row is quick, check if the row is visible, if not, add it and exit.
   * Closing rows requires checking if there are any children that also need to be closed.
   */
  toggleRowVisibility(index: number): void {
    // Expand a row
    if (!this.visibilitySet.has(index)) {
      this.visibilitySet.add(index);
      return;  // Nothing else to do, exit.
    }
    // Collapse a row and it's children
    const rowMap = this.rowIndexMap.get(index);
    // Loop rows to find the same parent and parentOffset > rowMap.offset (i.e. if the offset is bigger it's a child);
    this.rowIndexMap.forEach((value, key, map) => {
      if (key === index || (key > index && rowMap.parent === value.parent)) {
        if (this.visibilitySet.has(key)) {
          this.visibilitySet.delete(key);
        }
      }
    });
  }
}

@Component({
  selector: 'cr-calendar-grid-class',
  template: `
    <ng-container *ngFor="let calendarGridRow of calendarGridData.allCalendarGridRows; let i = index">
      <cr-calendar-grid-row *ngIf="calendarGridData.isRowVisible(i)" class="calendar-grid-row">

        <cr-calendar-grid-label class="pr-2" [ngStyle]="{'padding-left': paddingOffset(i)}">
          <span *ngIf="calendarGridRow.node && !calendarGridData.isRowVisible(i + 1)" class="pr-2" (click)="calendarGridData.toggleRowVisibility(i + 1)">O</span>
          <span *ngIf="calendarGridRow.node && calendarGridData.isRowVisible(i + 1)" class="pr-2" (click)="calendarGridData.toggleRowVisibility(i + 1)">X</span>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarGridClassComponent {

  @Input() calendarGridData: CalendarGridDataClass;

  @ContentChildren(CalendarGridRowDirective) rows: QueryList<CalendarGridRowDirective>;

  constructor() {}

  row(index: number): CalendarGridRowDirective {
    let row: CalendarGridRowDirective;
    if (this.rows && this.rows.length === 1) {
      // Client is iterating over a row
      row = this.rows.first;
    } else if (this.rows && this.rows.length > 1) {
      // Find the parent row that matches the index or default to the last row
      row = this.rows.find((row, idx, rows) => this.calendarGridData.rowIndexMap.get(index) && idx === this.calendarGridData.rowIndexMap.get(index).parent) || this.rows.last;
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
      template = row[templates].find((item, idx, array) => idx === this.calendarGridData.rowIndexMap.get(index).offset) || row[templates].last;
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
    const parentOffset = this.calendarGridData.rowIndexMap.get(index).offset;
    return `${parentOffset}rem`;
  }
}
