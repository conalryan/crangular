import { ChangeDetectionStrategy, Component, ContentChildren, Directive, HostBinding, Input, QueryList, TemplateRef } from '@angular/core';
import { BitMask, bitMask, clearBit, getBit, prevSetBit, setBit } from '../bits/bits';
import { isNotEmpty } from '../util/array.util';
import { DateUtil } from '../util/date.util';

/***********************************************************************
 * Calendar grid
 * - Based on [NgbTab](https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/tabset/tabset.ts)
 * - NgbTabTitle    ~   CalendarGridLabelTplDirective
 * - NgbTabContent  ~   CalendarGridCellTplDirective
 * - NgbTab         ~   CalendarGridRowDirective
 * - NgbTabset      ~   CalendarGridComponent
 ************************************************************************/

/**
 * A directive to wrap content to be displayed as the row label.
 * Exposes TemplateRef that can be used to project content.
 */
@Directive({ selector: 'ng-template[crCalendarGridLabel]' })
export class CalendarGridLabelTplDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * Simple element directive to add common styling
 */
@Directive({ selector: 'cr-calendar-grid-label' })
export class CalendarGridLabelElmDirective {
  @HostBinding('class') class = 'col-2 pr-2';
  constructor() {}
}

/**
 * A directive to wrap content to be displayed in a cell.
 * Exposes TemplateRef that can be used to project content.
 */
@Directive({ selector: 'ng-template[crCalendarGridCell]' })
export class CalendarGridCellTplDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * Component that wraps client content and applies common styling to create equal sized columns.
 */
@Component({
  selector: 'cr-calendar-grid-cell',
  template: `
    <div class="calendar-grid-cell-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .calendar-grid-cell-content {
        flex-basis: 0;
        flex-grow: 1;
        text-align: center;
      }
    `
  ]
})
export class CalendarGridCellComponent {
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.flex-basis') flexBasis = 0;
  @HostBinding('style.flex-grow') flexgrow = 1;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.width') width = '100%';
  constructor() {}
}

/**
 * A directive representing an individual row.
 * Adds common styling and exposes label and cell templates.
 */
@Directive({ selector: 'cr-calendar-grid-row' })
export class CalendarGridRowDirective {
  @HostBinding('class') class = 'row mr-0 ml-0';
  @ContentChildren(CalendarGridLabelTplDirective, { descendants: false })
  labelTpls: QueryList<CalendarGridLabelTplDirective>;
  @ContentChildren(CalendarGridCellTplDirective, { descendants: false })
  cellTpls: QueryList<CalendarGridCellTplDirective>;
  @ContentChildren(CalendarGridRowDirective, { descendants: false })
  nodes: QueryList<CalendarGridRowDirective>;
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
  nodes?: CalendarGridRow<any>[]; // <any> Least restrictive: If it's nested it might be a different shape.
}

export class CalendarGridData {
  private _rows: CalendarGridRow<any>[];
  private _flatRows: CalendarGridRow<any>[];
  private _visibleRows: BitMask;
  private _parentRows: BitMask;

  static cells = <T>(startDate: Date, numDays?: number, data?: T[], id?: string): CalendarGridCell<T>[] => {
    const calendarGridCells: CalendarGridCell<T>[] = [];
    const length = numDays || (isNotEmpty(data) ? data.length : 0);
    for (let i = 0; i < length; i++) {
      const date = DateUtil.cloneDate(startDate);
      if (i > 0) {
        date.setDate(date.getDate() + i);
      }
      const cell: CalendarGridCell<T> = {
        id: id,
        date: date,
        value: isNotEmpty(data) ? data[i] : undefined
      };
      calendarGridCells.push(cell);
    }
    return calendarGridCells;
  }

  static row = <T>(label: string, startDate: Date, numDays?: number, data?: T[]): CalendarGridRow<T> => {
    return {
      label: label,
      cells: CalendarGridData.cells(startDate, numDays, data, label)
    };
  }

  constructor(calendarGridRows: CalendarGridRow<any>[]) {
    this._rows = calendarGridRows;
    this._visibleRows = bitMask();
    this._parentRows = bitMask();
    this._flattenRows();
  }

  private _flattenRows(): void {
    this._flatRows = [];
    let totalIndex = 0;
    const rowslen = this._rows.length;
    for (let i = 0; i < rowslen; i++) {
      // Parent Row
      const row = this._rows[i];
      this._flatRows.push(row);
      setBit(this._visibleRows, totalIndex);
      setBit(this._parentRows, totalIndex);
      totalIndex++;
      // Loop nested rows (i.e. children and grandchildren...)
      const flatten = (nodes: CalendarGridRow<any>[]): void => {
        const nodesLen = nodes.length;
        for (let j = 0; j < nodesLen; j++) {
          const node = nodes[j];
          this._flatRows.push(node);
          totalIndex++;
          if (isNotEmpty(node.nodes)) {
            flatten(node.nodes);  // Depth first
          }
        }
      };
      if (isNotEmpty(row.nodes)) {
        flatten(row.nodes);  // Depth first
      }
    }
  }

  get rows(): CalendarGridRow<any>[] {
    return this._rows;
  }

  get flatRows(): CalendarGridRow<any>[] {
    return this._flatRows;
  }

  get visibleRows(): BitMask {
    return this._visibleRows;
  }

  get parentRows(): BitMask {
    return this._parentRows;
  }

  isRowVisible(index: number): boolean {
    return getBit(this._visibleRows, index) === 1;
  }

  toggleRowVisibility(calendarGridRow: CalendarGridRow<any>, index: number) {
    if (!calendarGridRow.nodes) {
      return; // No children to expand/collapse.
    }
    // Expand a child row (i.e. ++index), no need to expand grand child rows
    if (!this.isRowVisible(++index)) {
      // Loop nested rows (i.e. children and grandchildren...)
      const expand = (nodes: CalendarGridRow<any>[], bypassSet = false): void => {
        nodes.forEach(node => {
          // Expand this row, then increment the index (i.e. index++)
          if (!bypassSet) {
            setBit(this._visibleRows, index);
          }
          index++;
          if (isNotEmpty(node.nodes)) {
            // Don't expand nested data, however we need to traverse to maintain the proper indices.
            // TODO is there a more efficient way to do this?
            expand(node.nodes, true);
          }
        });
      };
      expand(calendarGridRow.nodes);
    } else {
      // Collapse all nested rows (i.e. children and grandchildren...)
      const collapse = (nodes: CalendarGridRow<any>[]): void => {
        nodes.forEach(node => {
          // Collapse this row, then increment the index (i.e. index++)
          clearBit(this._visibleRows, index++);
          if (isNotEmpty(node.nodes)) {
            collapse(node.nodes);
          }
        });
      };
      if (isNotEmpty(calendarGridRow.nodes)) {
        collapse(calendarGridRow.nodes);
      }
    }
  }

  /**
   * Return an array of numbers where the length of the array is the number of levels (aka nested rows) and
   * the value in each index is the index of the corresponding row.
   * e.g.
   * parent         [0]
   *  child         [0,0]
   *    grandchild  [0,0,0]
   *    grandchild  [0,0,1]
   *  child         [0,1]
   *    grandchild  [0,1,0]
   *    grandchild  [0,1,1]
   */
  levels(index: number): number[] {
    let levels = [0];
    const parentOffset = prevSetBit(this._parentRows, index);
    if (parentOffset === 0) {
      return levels;
    }
    let iterations = 0;
    const levelsFn = (nodes: CalendarGridRow<any>[], levelsIndex: number): void => {
      const nodesLen = nodes.length;
      for (let i = 0; i < nodesLen; i++) {
        if (iterations >= parentOffset) {
          break;
        }
        iterations++;
        levels[levelsIndex] = i;
        const node = nodes[i];
        if (isNotEmpty(node.nodes)) {
          levelsFn(node.nodes, levelsIndex + 1); // Depth first
        }
        if (i + 1 === nodesLen && iterations !== parentOffset) {
          // End of the for loop on this branch and we didn't find the node, therefore, remove this branch.
          levels = levels.splice(levels.length - 1, 1);
        }
      }
    };
    // Start at the closest parent row.
    const row = this._flatRows[index - parentOffset];
    levelsFn(row.nodes, 1);
    return levels;
  }
}

// -------------------------------------------- Utils --------------------------------------------

// findIndex e.g. this.calendarGridData.rows.findIndex has flaky browser support, and returns undefined unexpectedly.
export const rowIndex = (calendarGridRows: CalendarGridRow<any>[], label: string): number => {
  const rowsLen = calendarGridRows.length;
  for (let i = 0; i < rowsLen; i++) {
    const row = calendarGridRows[i];
    if (row.label === label) {
      return i;
    }
  }
  return -1;
};

// ---------------------------------------- CalendarGrid -----------------------------------------

@Component({
  selector: 'cr-calendar-grid',
  template: `
    <ng-container *ngFor="let calendarGridRow of calendarGridData.flatRows; let i = index">
      <cr-calendar-grid-row *ngIf="calendarGridData.isRowVisible(i)">
        <cr-calendar-grid-label [ngStyle]="{ 'padding-left': paddingOffset(i) }"
          (click)="calendarGridData.toggleRowVisibility(calendarGridRow, i)">
          <span *ngIf="calendarGridRow.nodes" class="small"
            [ngClass]="{
              'icon-chevron-right': !calendarGridData.isRowVisible(i + 1),
              'icon-chevron-down': calendarGridData.isRowVisible(i + 1)
            }">
          </span>
          <ng-container *ngIf="!template(calendarGridRow, i, 'labelTpls')">{{ calendarGridRow.label }}</ng-container>
          <ng-container
            *ngTemplateOutlet="template(calendarGridRow, i, 'labelTpls')?.templateRef; context: { label: calendarGridRow.label }">
          </ng-container>
        </cr-calendar-grid-label>

        <cr-calendar-grid-cell *ngFor="let calendarCell of calendarGridRow.cells; let j = index">
          <ng-container *ngIf="!template(calendarGridRow, i, 'cellTpls')">{{ calendarCell.value }}</ng-container>
          <ng-container *ngTemplateOutlet=" template(calendarGridRow, i, 'cellTpls')?.templateRef;
              context: { cell: calendarCell, cellIndex: j, row: calendarGridRow, rowIndex: i }">
          </ng-container>
        </cr-calendar-grid-cell>
      </cr-calendar-grid-row>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarGridComponent {
  @Input() calendarGridData: CalendarGridData;

  @ContentChildren(CalendarGridRowDirective) rowTemplates: QueryList<CalendarGridRowDirective>;

  constructor() {}

  rowTemplate(calendarGridRow: CalendarGridRow<any>, index: number): CalendarGridRowDirective {
    let rowTpl: CalendarGridRowDirective;
    const parentOffset = prevSetBit(this.calendarGridData.parentRows, index);
    if (parentOffset === 0) {
      // It's a parent row
      // Find corresponding row template e.g. calendarGridData.rows[1] would assume rowTemplates[1] default rowTemplates.last
      const parentIndex = rowIndex(this.calendarGridData.rows, calendarGridRow.label);
      rowTpl = this.rowTemplates.find((row, idx, rows) => idx === parentIndex) || this.rowTemplates.last;
    } else {
      // Find corresponding parent template
      const parentRow = this.calendarGridData.flatRows[index - parentOffset];
      const parentIndex = rowIndex(this.calendarGridData.rows, parentRow.label);
      rowTpl = this.rowTemplates.find((row, idx, rows) => idx === parentIndex) || this.rowTemplates.last;
      // Client may not be using any row templates
      if (rowTpl) {
        // Find corresponding child template
        const levels = this.calendarGridData.levels(index);
        const levelsLen = levels.length;
        for (let i = 1; i < levelsLen; i++) {
          const tplIndex = ++levels[i]; // QueryList on CalendarGridRowDirective appears to return itself plus children hence skip self (i.e. ++levels[i])
          rowTpl = rowTpl.nodes.find((rowTpl, idx, rowTpls) => idx === tplIndex) || rowTpl.nodes.last;
        }
      }
    }
    return rowTpl;
  }

  template(calendarGridRow: CalendarGridRow<any>, index: number, templates: string):
    CalendarGridLabelTplDirective | CalendarGridCellTplDirective | null {
    let template: CalendarGridLabelTplDirective | CalendarGridCellTplDirective | null;
    const rowTpl = this.rowTemplate(calendarGridRow, index);
    if (!rowTpl) {
      template = null;
    } else if (rowTpl[templates].length === 1) {
      // Client is iterating over a single template
      template = rowTpl[templates].first;
    } else {
      // Find the template that matches the row offset
      // (e.g. a row with 2 labels, will have 1 for parent row and 1 for nested row(s)) else default to the last template.
      const levels = this.calendarGridData.levels(index);
      const tplIdx = (levels.length + levels[levels.length - 1]) - 1; // e.g [0,0] would be the first child; [0,0,1] would be the second grandchild.
      template = rowTpl[templates].find((item, idx, array) => idx === tplIdx) || rowTpl[templates].last;
    }
    return template;
  }

  /**
   * Apply padding based on the offset from the parent.
   * ex.
   * parentRow
   *   childRow
   *     grandChildRow
   *     grandChildRow
   */
  paddingOffset(index: number): string {
    const levels = this.calendarGridData.levels(index);
    return `${levels.length}rem`;
  }
}
