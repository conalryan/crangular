import { AfterContentChecked, Component, ContentChildren, Directive, Input, QueryList, TemplateRef } from '@angular/core';

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
  /**
   * The calendar row label.
   *
   * Use the [`CalendarGridLabel`](#/components/calendargrid/api#CalendarGridLabel) directive for non-string labels.
   */
  @Input() title: string;

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

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'cr-calendar-grid',
  exportAs: 'crCalendarGrid',
  template: `

    <div *ngFor="let row of rows">
      <ng-template [ngTemplateOutlet]="row.labelTpl?.templateRef"></ng-template>
    </div>

    <ng-template ngFor let-row [ngForOf]="rows">
      <ng-template [ngTemplateOutlet]="row.cellTpl?.templateRef"></ng-template>
    </ng-template>


    <div *ngFor="let calendarGridRow of calendarGridData.rows; let i = index" class="row calendar-grid-row">
      <div class="col-2">
      <ng-container *ngIf="!labelTpl(i)">
        {{ calendarGridRow.label }}
      </ng-container>
      <ng-container *ngTemplateOutlet="labelTpl(i);context:{label:calendarGridRow.label}"></ng-container>
      </div>
      <div class="col d-flex pl-0">
        <div *ngFor="let calendarCell of calendarGridRow.cells"
          class="flex-grow-1 calendar-grid-cell">
          <ng-container *ngIf="!cellTpl(i)">
            {{ calendarCell.value }}
          </ng-container>
          <ng-container *ngTemplateOutlet="cellTpl(i);context:{cell:calendarCell}"></ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-grid-row:not(:last-child) {
      border-bottom: 1px solid #d2d2d2;
    }
    .calendar-grid-cell {
      text-align: center;
      // https://stackoverflow.com/questions/25066214/flexbox-not-giving-equal-width-to-elements/25066844#25066844
      flex-basis: 0;
    }
    .weekend {
      background-color: #e8e8e8;
    }
  `]
})
export class CalendarGridComponent implements AfterContentChecked {

  @Input() calendarGridData: CalendarGridData;
  @ContentChildren(CalendarGridRowDirective) rows: QueryList<CalendarGridRowDirective>;

  constructor(/* config: NgbTabsetConfig */) {
    // this.type = config.type;
    // this.justify = config.justify;
    // this.orientation = config.orientation;
  }

  /**
   * Selects the tab with the given id and shows its associated content panel.
   *
   * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
   * hidden depending on the `destroyOnHide` value.
   */
  select(tabId: string) {
    // let selectedTab = this._getTabById(tabId);
    // if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
    //   let defaultPrevented = false;

    //   this.tabChange.emit(
    //       {activeId: this.activeId, nextId: selectedTab.id, preventDefault: () => { defaultPrevented = true; }});

    //   if (!defaultPrevented) {
    //     this.activeId = selectedTab.id;
    //   }
    // }
  }

  ngAfterContentChecked() {
    // auto-correct activeId that might have been set incorrectly as input
    // let activeTab = this._getTabById(this.activeId);
    // this.activeId = activeTab ? activeTab.id : (this.rows.length ? this.rows.first.id : null);
  }

  private _getTabById(id: string): CalendarGridRowDirective {
    // let tabsWithId: NgbTab[] = this.rows.filter(tab => tab.id === id);
    // return tabsWithId.length ? tabsWithId[0] : null;
    return null;
  }

  labelTpl(index: number): CalendarGridLabelDirective | null {
    let labelTpl: CalendarGridLabelDirective | null;
    if (this.rows && this.rows.length === 1) {
      labelTpl = this.rows[0].labelTpl;
    } else if (this.rows && this.rows.length > 1) {
      labelTpl = this.rows[index].labelTpl;
    }
    return labelTpl;
  }

  cellTpl(index: number): CalendarGridCellDirective | null {
    let cellTpl: CalendarGridCellDirective | null;
    if (this.rows && this.rows.length === 1) {
      cellTpl = this.rows[0].cellTpl;
    } else if (this.rows && this.rows.length > 1) {
      cellTpl = this.rows[index].cellTpl;
    }
    return cellTpl;
  }
}
