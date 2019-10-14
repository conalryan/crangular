import { Component, ContentChildren, Directive, HostBinding, Input, OnChanges, QueryList, TemplateRef } from '@angular/core';

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
  // pl-1 = 0.25rem; pl-2 = 0.5rem; pl-3 = 1rem;
  @HostBinding('class') class = 'col-2 pl-2 pr-2';
  @HostBinding('style.display') display = 'inline-block';
  @HostBinding('class.border') border = '1px solid #d2d2d2;'
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
  @HostBinding('class') class = 'col d-flex pl-2 pr-2';
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
  // TODO calendar-grid-row class is not applied by cr-calendar-grid component when using: ('class') class = 'row'; why not?
  @HostBinding('class') row = 'row mr-0 ml-0';
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
 * A component that makes it easy to create equal sized columns.
 */
@Component({
  selector: 'cr-calendar-grid',
  template: `
    <ng-container *ngFor="let calendarGridRow of allCalendarGridRows; let i = index">

      <cr-calendar-grid-row *ngIf="isRowVisible(i)" class="calendar-grid-row">

        <cr-calendar-grid-label>
          <span [ngStyle]="{'padding-left': paddingOffset(i)}" class="pr-2" *ngIf="calendarGridRow.node && !isRowVisible(i + 1)" (click)="toggleRowVisibility(i + 1)">O</span>
          <span [ngStyle]="{'padding-left': paddingOffset(i)}"  class="pr-2" *ngIf="calendarGridRow.node && isRowVisible(i + 1)" (click)="toggleRowVisibility(i + 1)">X</span>

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
    this.allCalendarGridRows = this.extractAllRows(this.calendarGridData);
  }

  extractAllRows(calendarGridData: CalendarGridData): CalendarGridRow<any>[] {
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
          // Intentional: Don't add nested rows to this.visibleRows by default
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
   * @param index
   */
  toggleRowVisibility(index: number): void {

    // Add/exapnd a row
    if (!this.visibleRows.has(index)) {
      this.visibleRows.add(index);
      return;  // Nothing else to do, exit.
    }

    // Close a row and it's children
    const rowMap = this.rowIndexMap.get(index);
    // Loop rows to find the same parent and parentOffset > rowMap.offset;
    this.rowIndexMap.forEach((value, key, map) => {
      if (key === index || (key > index && rowMap.parent === value.parent)) {
        if (this.visibleRows.has(key)) {
          this.visibleRows.delete(key);
        }
      }
    });
  }

  findRowByIndex(index: number): CalendarGridRowDirective {
    let row: CalendarGridRowDirective;
    if (this.rows && this.rows.length === 1) {
      row = this.rows.first;
    } else if (this.rows && this.rows.length > 1) {
      row = this.rows.find((row, idx, rows) => this.rowIndexMap.get(index) && idx === this.rowIndexMap.get(index).parent) || this.rows.last;
    }
    return row;
  }

  template(index: number, templates: string): CalendarGridLabelTplDirective | CalendarGridLabelTplDirective | null {
    let template: CalendarGridLabelTplDirective | CalendarGridLabelTplDirective | null;
    const row = this.findRowByIndex(index);
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


  // labelTpl(index: number): CalendarGridLabelTplDirective | null {
  //   let labelTpl: CalendarGridLabelTplDirective | null;
  //   if (this.rows && this.rows.length === 1) {
  //     const row = this.rows.first;
  //     labelTpl = row.labelTpls.length === 1
  //       ? row.labelTpls.first
  //       : row.labelTpls.find((item, idx, array) => {
  //         return idx === (this.rowIndexMap.get(index) && this.rowIndexMap.get(index).parent) || row.labelTpls.last;
  //       });
  //   } else if (this.rows && this.rows.length > 1) {
  //     const row = this.rows.find((row, idx, rows) => {
  //       if (this.rowIndexMap.get(index)) {
  //         return idx === this.rowIndexMap.get(index).parent || this.rows.last;
  //       }
  //       return this.rows.last;
  //     });
  //     labelTpl = row.labelTpls.length === 1
  //       ? row.labelTpls.first
  //       : row.labelTpls.find((item, idx, array) => {
  //         return idx === (this.rowIndexMap.get(index) && this.rowIndexMap.get(index).parent) || row.labelTpls.last;
  //       });
  //   }
  //   return labelTpl;
  // }

  // cellTpl(index: number): CalendarGridCellTplDirective | null {
  //   let cellTpl: CalendarGridCellTplDirective | null;
  //   if (this.rows && this.rows.length === 1) {
  //     const row = this.rows.first;
  //     cellTpl = row.cellTpls.length === 1
  //       ? row.cellTpls.first
  //       : row.cellTpls.find((item, idx, array) => {
  //         if (this.rowIndexMap.get(index) {
  //           return idx ===  this.rowIndexMap.get(index).parent || row.cellTpls.last;
  //         }
  //         return row.cellTpls.last;
  //       });
  //   } else if (this.rows && this.rows.length > 1) {
  //     const row = this.rows.find((row, idx, rows) => {
  //       if (this.rowIndexMap.get(index) {
  //         return idx === this.rowIndexMap.get(index).parent || this.rows.last;
  //       }
  //       return this.rows.last;
  //     });
  //     cellTpl = row.cellTpls.length === 1
  //       ? row.cellTpls.first
  //       : row.cellTpls.find((item, idx, array) => {
  //         if (this.rowIndexMap.get(index)) {
  //           return idx === this.rowIndexMap.get(index).parent || row.cellTpls.last;
  //         }
  //         return this.rowIndexMap.get(index);
  //     });
  //   }
  //   return cellTpl;
  // }

  paddingOffset(index: number): string {
    const parentOffset = this.rowIndexMap.get(index).offset;
    return `${parentOffset}rem`;
  }
}
