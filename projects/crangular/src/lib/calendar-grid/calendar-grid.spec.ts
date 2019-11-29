import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows, codes, prices, quantities } from 'projects/examples/src/app/calendar-grid-ex/calendar-grid-data.stub';
import { printBitMask } from '../bits/bits';
import { createGenericTestComponent } from '../util/test.util';
import { CalendarGridCellComponent, CalendarGridCellTplDirective, CalendarGridComponent, CalendarGridData, CalendarGridLabelElmDirective, CalendarGridLabelTplDirective, CalendarGridRowDirective } from './calendar-grid';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('CalendarGridLabelTplDirective', () => {
  
  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent, CalendarGridLabelTplDirective]}); });
  
  it('should expose template', () => {
    const fixture = createTestComponent(`
      <ng-template crCalendarGridLabel>Hello world</ng-template>
    `);
    expect(fixture.componentInstance.labelTpl.templateRef).not.toBeNull();
  });
});

describe('CalendarGridLabelElmDirective', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent, CalendarGridLabelElmDirective]}); });
  
  it('should set common classes', () => {
    const fixture = createTestComponent(`
      <cr-calendar-grid-label>Label for row</cr-calendar-grid-label>
    `);
    const calendarGridLabelEl: HTMLElement = fixture.debugElement.query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(calendarGridLabelEl.classList.contains('col-2')).toEqual(true);
    expect(calendarGridLabelEl.classList.contains('pr-2')).toEqual(true);
  });
});

describe('CalendarGridCellTplDirective', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent, CalendarGridCellTplDirective]}); });
  
  it('should expose template', () => {
    const fixture = createTestComponent(`
      <ng-template crCalendarGridCell>Hello world</ng-template>
    `);
    expect(fixture.componentInstance.cellTpl.templateRef).not.toBeNull();
  });
});

describe('CalendarGridCellComponent', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent, CalendarGridCellComponent]}); });
  
  it('should set common styles', () => {
    const fixture = createTestComponent(`
      <cr-calendar-grid-cell>cell 1</cr-calendar-grid-cell>
    `);
    const calendarGridLabelEl: HTMLElement = fixture.debugElement.query(By.css('cr-calendar-grid-cell')).nativeElement;
    expect(calendarGridLabelEl.style['display']).toEqual('flex');
    expect(calendarGridLabelEl.style['flex-basis']).toEqual('0px');
    expect(calendarGridLabelEl.style['flex-grow']).toEqual('1');
    expect(calendarGridLabelEl.style['position']).toEqual('relative');
    expect(calendarGridLabelEl.style['width']).toEqual('100%');
  });
});

describe('CalendarGridRowDirective', () => {
  
  beforeEach(() => { 
    TestBed.configureTestingModule({declarations: [TestComponent, CalendarGridRowDirective, CalendarGridLabelElmDirective, CalendarGridCellComponent]}); 
  });
  
  it('should set common classes', () => {
    const fixture = createTestComponent(`
      <cr-calendar-grid-row>
        <cr-calendar-grid-label>Label</cr-calendar-grid-label>
        <cr-calendar-grid-cell>Cell 1</cr-calendar-grid-cell>
        <cr-calendar-grid-cell>Cell 2</cr-calendar-grid-cell>
        <cr-calendar-grid-cell>Cell 3</cr-calendar-grid-cell>
      </cr-calendar-grid-row>
    `);
    const calendarGridRowEl: HTMLElement = fixture.debugElement.query(By.css('cr-calendar-grid-row')).nativeElement;
    expect(calendarGridRowEl.classList.contains('row')).toEqual(true);
    expect(calendarGridRowEl.classList.contains('mr-0')).toEqual(true);
    expect(calendarGridRowEl.classList.contains('ml-0')).toEqual(true);
  });

  it('should display correctly', () => {
    const fixture = createTestComponent(`
      <cr-calendar-grid-row>
        <cr-calendar-grid-label>Label</cr-calendar-grid-label>
        <cr-calendar-grid-cell>Cell 1</cr-calendar-grid-cell>
        <cr-calendar-grid-cell>Cell 2</cr-calendar-grid-cell>
        <cr-calendar-grid-cell>Cell 3</cr-calendar-grid-cell>
      </cr-calendar-grid-row>
    `);
    const calendarGridRowEl: HTMLElement = fixture.debugElement.query(By.css('cr-calendar-grid-row')).nativeElement;
    expect(calendarGridRowEl.childNodes[0].nodeName).toEqual('CR-CALENDAR-GRID-LABEL');
    expect(calendarGridRowEl.childNodes[1].nodeName).toEqual('CR-CALENDAR-GRID-CELL');
    expect(calendarGridRowEl.childNodes[2].nodeName).toEqual('CR-CALENDAR-GRID-CELL');
    expect(calendarGridRowEl.childNodes[3].nodeName).toEqual('CR-CALENDAR-GRID-CELL');
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  @ViewChild(CalendarGridRowDirective) row: CalendarGridRowDirective;
  @ViewChild(CalendarGridLabelTplDirective) labelTpl: CalendarGridLabelTplDirective;
  @ViewChild(CalendarGridCellTplDirective) cellTpl: CalendarGridCellTplDirective;
}

describe('CalendarGridData', () => {
  it('should generate cells', () => {
    // Generate empty cells from range
    const cellsFromRange = CalendarGridData.cells('Codes', new Date(2019, 11, 1, 12), 7);
    expect(cellsFromRange.length).toEqual(7);
    expect(cellsFromRange[0].label).toEqual('Codes');
    expect(cellsFromRange[0].date.getFullYear()).toEqual(2019);
    expect(cellsFromRange[0].date.getMonth()).toEqual(11);
    expect(cellsFromRange[0].date.getDate()).toEqual(1);
    expect(cellsFromRange[0].value).toEqual(undefined);

    expect(cellsFromRange[4].label).toEqual('Codes');
    expect(cellsFromRange[4].date.getFullYear()).toEqual(2019);
    expect(cellsFromRange[4].date.getMonth()).toEqual(11);
    expect(cellsFromRange[4].date.getDate()).toEqual(5);
    expect(cellsFromRange[4].value).toEqual(undefined);

    // Generate from array of data
    const cellsFromData = CalendarGridData.cells('Codes', new Date(2019, 11, 1, 12), null, codes());
    expect(cellsFromData.length).toEqual(7);
    expect(cellsFromData.length).toEqual(7);
    expect(cellsFromData[2].label).toEqual('Codes');
    expect(cellsFromData[2].date.getFullYear()).toEqual(2019);
    expect(cellsFromData[2].date.getMonth()).toEqual(11);
    expect(cellsFromData[2].date.getDate()).toEqual(3);
    expect(cellsFromData[2].value).toEqual('Q993f');

    expect(cellsFromData[6].label).toEqual('Codes');
    expect(cellsFromData[6].date.getFullYear()).toEqual(2019);
    expect(cellsFromData[6].date.getMonth()).toEqual(11);
    expect(cellsFromData[6].date.getDate()).toEqual(7);
    expect(cellsFromData[6].value).toEqual('TJH11');
  });

  it('should generate row', () => {
    // Generate row with empty cells from range
    const rowFromRange = CalendarGridData.row('Codes', new Date(2019, 11, 1, 12), 7);
    expect(rowFromRange.label).toEqual('Codes');
    expect(rowFromRange.cells.length).toEqual(7);
    expect(rowFromRange.nodes).toEqual(undefined);
    expect(rowFromRange.cells[0].label).toEqual('Codes');
    expect(rowFromRange.cells[0].date.getFullYear()).toEqual(2019);
    expect(rowFromRange.cells[0].date.getMonth()).toEqual(11);
    expect(rowFromRange.cells[0].date.getDate()).toEqual(1);
    expect(rowFromRange.cells[0].value).toEqual(undefined);

    expect(rowFromRange.cells[4].label).toEqual('Codes');
    expect(rowFromRange.cells[4].date.getFullYear()).toEqual(2019);
    expect(rowFromRange.cells[4].date.getMonth()).toEqual(11);
    expect(rowFromRange.cells[4].date.getDate()).toEqual(5);
    expect(rowFromRange.cells[4].value).toEqual(undefined);

    // Generate from array of data
    const rowFromData = CalendarGridData.row('Codes', new Date(2019, 11, 1, 12), null, codes());
    expect(rowFromData.label).toEqual('Codes');
    expect(rowFromData.cells.length).toEqual(7);
    expect(rowFromRange.nodes).toEqual(undefined);
    expect(rowFromData.cells[2].label).toEqual('Codes');
    expect(rowFromData.cells[2].date.getFullYear()).toEqual(2019);
    expect(rowFromData.cells[2].date.getMonth()).toEqual(11);
    expect(rowFromData.cells[2].date.getDate()).toEqual(3);
    expect(rowFromData.cells[2].value).toEqual('Q993f');

    expect(rowFromData.cells[6].label).toEqual('Codes');
    expect(rowFromData.cells[6].date.getFullYear()).toEqual(2019);
    expect(rowFromData.cells[6].date.getMonth()).toEqual(11);
    expect(rowFromData.cells[6].date.getDate()).toEqual(7);
    expect(rowFromData.cells[6].value).toEqual('TJH11');
  });

  it('should create new CalendarGridData', () => {
    const codesRow = CalendarGridData.row('Code', new Date(2019, 11, 1, 12), null, codes());
    const pricesRow = CalendarGridData.row('Price', new Date(2019, 11, 1, 12), null, prices());
    const quantitiesRow = CalendarGridData.row('Quantity', new Date(2019, 11, 1, 12), null, quantities());
    const calendarGridData = new CalendarGridData([codesRow, pricesRow, quantitiesRow]);

    expect(calendarGridData.rowsRaw.length).toEqual(3);
    expect(calendarGridData.rows.length).toEqual(3);
    expect(printBitMask(calendarGridData.parentRows)).toEqual('111');
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('111');
  });

  it('should toggle visibility', () => {
    const codesRow = CalendarGridData.row('Code', new Date(2019, 11, 1, 12), null, codes());
    const pricesRow = CalendarGridData.row('Price', new Date(2019, 11, 1, 12), null, prices());
    const quantitiesRow = CalendarGridData.row('Quantity', new Date(2019, 11, 1, 12), null, quantities());
    const calendarGridData = new CalendarGridData([codesRow, pricesRow, quantitiesRow]);

    expect(printBitMask(calendarGridData.visibleRows)).toEqual('111');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(true);
    expect(calendarGridData.isRowVisible(2)).toEqual(true);

    calendarGridData.toggleRowVisibility(0);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('110');
    expect(calendarGridData.isRowVisible(0)).toEqual(false);

    calendarGridData.toggleRowVisibility(2);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('10');
    expect(calendarGridData.isRowVisible(2)).toEqual(false);

    calendarGridData.toggleRowVisibility(0);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('11');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
  });

  it('should toggle visibility (nested data)', () => {
    const codesRow = CalendarGridData.row('Code', new Date(2019, 11, 1, 12), null, codes());
    const pricesRow = CalendarGridData.row('Price', new Date(2019, 11, 1, 12), null, prices());
    const quantitiesRow = CalendarGridData.row('Quantity', new Date(2019, 11, 1, 12), null, quantities());
    codesRow.nodes = [pricesRow];
    pricesRow.nodes = [quantitiesRow];
    const calendarGridData = new CalendarGridData([codesRow, pricesRow, quantitiesRow]);

    expect(printBitMask(calendarGridData.visibleRows)).toEqual('101001');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(false);
    expect(calendarGridData.isRowVisible(2)).toEqual(false);
    expect(calendarGridData.isRowVisible(3)).toEqual(true);
    expect(calendarGridData.isRowVisible(4)).toEqual(false);
    expect(calendarGridData.isRowVisible(5)).toEqual(true);

    calendarGridData.toggleRowVisibility(0);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('101000');
    expect(calendarGridData.isRowVisible(0)).toEqual(false);

    calendarGridData.toggleRowVisibility(0);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('101001');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);

    calendarGridData.toggleRowVisibility(1);
    calendarGridData.toggleRowVisibility(2);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('101111');
    expect(calendarGridData.isRowVisible(1)).toEqual(true);
    expect(calendarGridData.isRowVisible(2)).toEqual(true);

    // Collapse children too
    calendarGridData.toggleRowVisibility(1);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('101001');
    expect(calendarGridData.isRowVisible(1)).toEqual(false);
    expect(calendarGridData.isRowVisible(2)).toEqual(false);
  });

  it('should toggle nodes', () => {
    const codesRow = CalendarGridData.row('Code', new Date(2019, 11, 1, 12), null, codes());
    const pricesRow1 = CalendarGridData.row('Price1', new Date(2019, 11, 1, 12), null, prices());
    const quantitiesRow1 = CalendarGridData.row('Quantity1', new Date(2019, 11, 1, 12), null, quantities());
    const pricesRow2 = CalendarGridData.row('Price2', new Date(2019, 11, 1, 12), null, prices());
    const quantitiesRow2 = CalendarGridData.row('Quantity2', new Date(2019, 11, 1, 12), null, quantities());
    
    pricesRow1.nodes = [quantitiesRow1];
    pricesRow2.nodes = [quantitiesRow2];
    codesRow.nodes = [pricesRow1, pricesRow2];
    const calendarGridData = new CalendarGridData([codesRow]);

    expect(printBitMask(calendarGridData.visibleRows)).toEqual('1');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(false);
    expect(calendarGridData.isRowVisible(2)).toEqual(false);
    expect(calendarGridData.isRowVisible(3)).toEqual(false);
    expect(calendarGridData.isRowVisible(4)).toEqual(false);

    calendarGridData.toggleNodesVisibility(0);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('1011');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(true);
    expect(calendarGridData.isRowVisible(2)).toEqual(false);
    expect(calendarGridData.isRowVisible(3)).toEqual(true);
    expect(calendarGridData.isRowVisible(4)).toEqual(false);

    calendarGridData.toggleNodesVisibility(0);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('1');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(false);
    expect(calendarGridData.isRowVisible(2)).toEqual(false);
    expect(calendarGridData.isRowVisible(3)).toEqual(false);
    expect(calendarGridData.isRowVisible(4)).toEqual(false);

    calendarGridData['_expand'](calendarGridData.rows);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('11111');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(true);
    expect(calendarGridData.isRowVisible(2)).toEqual(true);
    expect(calendarGridData.isRowVisible(3)).toEqual(true);
    expect(calendarGridData.isRowVisible(4)).toEqual(true);

    calendarGridData.toggleNodesVisibility(1);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('11011');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(true);
    expect(calendarGridData.isRowVisible(2)).toEqual(false);
    expect(calendarGridData.isRowVisible(3)).toEqual(true);
    expect(calendarGridData.isRowVisible(4)).toEqual(true);

    calendarGridData.toggleNodesVisibility(0);
    expect(printBitMask(calendarGridData.visibleRows)).toEqual('1');
    expect(calendarGridData.isRowVisible(0)).toEqual(true);
    expect(calendarGridData.isRowVisible(1)).toEqual(false);
    expect(calendarGridData.isRowVisible(2)).toEqual(false);
    expect(calendarGridData.isRowVisible(3)).toEqual(false);
    expect(calendarGridData.isRowVisible(4)).toEqual(false);
  });

  it('shoud return levels', () => {
    const codesRow = CalendarGridData.row('Code', new Date(2019, 11, 1, 12), null, codes());
    const pricesRow = CalendarGridData.row('Price', new Date(2019, 11, 1, 12), null, prices());
    const quantitiesRow = CalendarGridData.row('Quantity', new Date(2019, 11, 1, 12), null, quantities());
    codesRow.nodes = [pricesRow];
    pricesRow.nodes = [quantitiesRow];
    const calendarGridData = new CalendarGridData([codesRow, pricesRow, quantitiesRow]);

    expect(calendarGridData.levels(0)).toEqual([0]);
    expect(calendarGridData.levels(1)).toEqual([0, 0]);
    expect(calendarGridData.levels(2)).toEqual([0, 0, 0]);
    expect(calendarGridData.levels(3)).toEqual([0]);
    expect(calendarGridData.levels(4)).toEqual([0, 0]);
    expect(calendarGridData.levels(5)).toEqual([0]);
  });
});

const createTestCalendarGridComponent = (html: string) =>
    createGenericTestComponent(html, TestCalendarGridComponent) as ComponentFixture<TestCalendarGridComponent>;


describe('calendar-grid', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [
    CalendarGridLabelTplDirective,
    CalendarGridLabelElmDirective,
    CalendarGridCellTplDirective,
    CalendarGridCellComponent,
    CalendarGridRowDirective,
    CalendarGridComponent,
    TestCalendarGridComponent
  ]}); });
  
  it('should work without a template (non-nested)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridData"></cr-calendar-grid>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Parent Row 1');
    
    let cellDes: DebugElement[] = rowDes[0].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('one');
  });

  it('should work without a template (single-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridNestedData"></cr-calendar-grid>
    `);
    
    const calGridDe = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Parent Row 2');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Child 1 (PR2)');

    let cellDes = rowDes[2].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[6].nativeElement.innerText).toEqual('true');

    // Collapse child row
    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Parent Row 3');
  });

  it('should work without a template (double-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"></cr-calendar-grid>
    `);

    const calGridDe = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Parent Row 3');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[3].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Child 1 (PR3)');

    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(5);

    label = rowDes[4].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Grandchild 1 (PR3-C1)');

    let cellDes = rowDes[4].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[5].nativeElement.innerText).toEqual('6');

    // Collapse child row, will also collapse grand child.
    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Parent Row 3');
  });

  it('should work with a single template (non-nested)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridData">
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 1 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 1 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 1');
    
    let cellDes: DebugElement[] = rowDes[0].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 1 one');
  });

  it('should work without a template (single-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 1 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 1 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);
    
    const calGridDe = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 2');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Child 1 (PR2)');

    let cellDes = rowDes[2].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[6].nativeElement.innerText).toEqual('Row 1 cellTpl 1 true');

    // Collapse child row
    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 3');
  });

  it('should work with a single template (double-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 1 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 1 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);

    const calGridDe = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 3');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[3].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Child 1 (PR3)');

    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(5);

    label = rowDes[4].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Grandchild 1 (PR3-C1)');

    let cellDes = rowDes[4].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[5].nativeElement.innerText).toEqual('Row 1 cellTpl 1 6');

    // Collapse child row, will also collapse grand child.
    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 3');
  });

  it('should work with a multi row templates (non-nested)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridData">
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 1 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 1 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 2 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 2 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 3 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 3 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 1');
    
    let cellDes: DebugElement[] = rowDes[0].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 1 one');

    // row 2
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 1 Parent Row 2');
    
    cellDes = rowDes[1].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 2 cellTpl 1 4');

    // row 3
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 1 Parent Row 3');
    
    cellDes = rowDes[2].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 3 cellTpl 1 true');
  });

  it('should work with a multi row templates (single-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 1 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 1 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 2 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 2 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 3 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 3 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 1');

    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Child 1 (PR1)');
    
    let cellDes: DebugElement[] = rowDes[1].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 1 4');

    // row 2
    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 1 Parent Row 2');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(5);

    label = rowDes[3].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 1 Child 1 (PR2)');
    
    cellDes = rowDes[3].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[5].nativeElement.innerText).toEqual('Row 2 cellTpl 1 false');

    // row 3
    label = rowDes[4].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 1 Parent Row 3');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(6);

    label = rowDes[5].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 1 Child 1 (PR3)');

    cellDes = rowDes[5].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[2].nativeElement.innerText).toEqual('Row 3 cellTpl 1 three');
  });

  it('should work with a multi row templates (double-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 1 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 1 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 2 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 2 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            Row 3 labelTpl 1 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            Row 3 cellTpl 1 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 1');

    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Child 1 (PR1)');
    
    // Expand grand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(5);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Grandchild 1 (PR1-C1)');

    let cellDes: DebugElement[] = rowDes[2].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 1 true');

    // row 2
    label = rowDes[3].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 1 Parent Row 2');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(6);

    label = rowDes[4].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 1 Child 1 (PR2)');
    
    // Expand grand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(7);

    label = rowDes[5].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 1 Grandchild 1 (PR2-C1)');

    cellDes = rowDes[5].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 2 cellTpl 1 one');

    // row 3
    label = rowDes[6].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 1 Parent Row 3');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(8);

    label = rowDes[7].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 1 Child 1 (PR3)');

    // Expand grand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(9);

    label = rowDes[8].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 1 Grandchild 1 (PR3-C1)');

    cellDes = rowDes[8].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 3 cellTpl 1 4');
  });

  it('should work with a nested templates (single-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
        <!-- Parent -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">Row 1 labelTpl 1 {{ l }}</ng-template>
          <ng-template crCalendarGridCell let-c="cell">Row 1 cellTpl 1 {{ c?.value }}</ng-template>
          <!-- Child -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">Row 1 labelTpl 2 {{ l }}</ng-template>
            <ng-template crCalendarGridCell let-c="cell">Row 1 cellTpl 2 {{ c?.value }}</ng-template>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 1');

    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Child 1 (PR1)');
    
    let cellDes: DebugElement[] = rowDes[1].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 2 4');

    // row 2
    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 2');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(5);

    label = rowDes[3].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Child 1 (PR2)');
    
    cellDes = rowDes[3].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[5].nativeElement.innerText).toEqual('Row 1 cellTpl 2 false');

    // row 3
    label = rowDes[4].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 3');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(6);

    label = rowDes[5].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Child 1 (PR3)');

    cellDes = rowDes[5].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[2].nativeElement.innerText).toEqual('Row 1 cellTpl 2 three');
  });

  it('should work with a nested templates (double-nest)', () => {
    const fixture = createTestCalendarGridComponent(`
      <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
        <!-- Parent -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">Row 1 labelTpl 1 {{ l }}</ng-template>
          <ng-template crCalendarGridCell let-c="cell">Row 1 cellTpl 1 {{ c?.value }}</ng-template>
          <!-- Child -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">Row 1 labelTpl 2 {{ l }}</ng-template>
            <ng-template crCalendarGridCell let-c="cell">Row 1 cellTpl 2 {{ c?.value }}</ng-template>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>
      </cr-calendar-grid>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 1');

    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Child 1 (PR1)');
    
    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(5);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Grandchild 1 (PR1-C1)');
    
    let cellDes: DebugElement[] = rowDes[2].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 2 true');

    // row 2
    label = rowDes[3].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 2');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(6);

    label = rowDes[4].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Child 1 (PR2)');
    
    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(7);

    label = rowDes[5].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Grandchild 1 (PR2-C1)');
    
    cellDes = rowDes[5].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 2 one');
   
    // row 3
    label = rowDes[6].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 3');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(8);

    label = rowDes[7].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Child 1 (PR3)');
    
    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(9);

    label = rowDes[8].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Grandchild 1 (PR3-C1)');
    
    cellDes = rowDes[8].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 2 4');
  });

  it('should work with a multi row nested templates (double-nest)', () => {
    const fixture = createTestCalendarGridComponent(`      
      <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">Row 1 labelTpl 1 {{ l }}</ng-template>
          <ng-template crCalendarGridCell let-c="cell">Row 1 cellTpl 1 {{ c?.value }}</ng-template>
          <!-- Child -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">Row 1 labelTpl 2 {{ l }}</ng-template>
            <ng-template crCalendarGridCell let-c="cell">Row 1 cellTpl 2 {{ c?.value }}</ng-template>
            <!-- Grandchild -->
            <cr-calendar-grid-row>
              <ng-template crCalendarGridLabel let-l="label">Row 1 labelTpl 3 {{ l }}</ng-template>
              <ng-template crCalendarGridCell let-c="cell">Row 1 cellTpl 3 {{ c?.value }}</ng-template>
            </cr-calendar-grid-row>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">Row 2 labelTpl 1 {{ l }}</ng-template>
          <ng-template crCalendarGridCell let-c="cell">Row 2 cellTpl 1 {{ c?.value }}</ng-template>
          <!-- Child -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">Row 2 labelTpl 2 {{ l }}</ng-template>
            <ng-template crCalendarGridCell let-c="cell">Row 2 cellTpl 2 {{ c?.value }}</ng-template>
            <!-- Note no grandchild here, it will use child template above for grand child -->
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>

        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">Row 3 labelTpl 1 {{ l }}</ng-template>
          <ng-template crCalendarGridCell let-c="cell">Row 3 cellTpl 1 {{ c?.value }}</ng-template>
          <!-- Child -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">Row 3 labelTpl 2 {{ l }}</ng-template>
            <ng-template crCalendarGridCell let-c="cell">Row 3 cellTpl 2 {{ c?.value }}</ng-template>
            <!-- Grandchild -->
            <cr-calendar-grid-row>
              <ng-template crCalendarGridLabel let-l="label">Row 3 labelTpl 3 {{ l }}</ng-template>
              <ng-template crCalendarGridCell let-c="cell">Row 3 cellTpl 3 {{ c?.value }}</ng-template>
            </cr-calendar-grid-row>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>
    `);
    
    let calGridDe: DebugElement = fixture.debugElement.query(By.css('cr-calendar-grid'));
    expect(calGridDe.nativeElement).not.toBeNull();
    
    let rowDes: DebugElement[] = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(3);

    let label: HTMLElement = rowDes[0].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 1 Parent Row 1');

    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(4);

    label = rowDes[1].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 2 Child 1 (PR1)');
    
    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(5);

    label = rowDes[2].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 1 labelTpl 3 Grandchild 1 (PR1-C1)');
    
    let cellDes: DebugElement[] = rowDes[2].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 1 cellTpl 3 true');

    // row 2
    label = rowDes[3].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 1 Parent Row 2');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(6);

    label = rowDes[4].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 2 Child 1 (PR2)');
    
    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(7);

    label = rowDes[5].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 2 labelTpl 2 Grandchild 1 (PR2-C1)');
    
    cellDes = rowDes[5].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 2 cellTpl 2 one');
   
    // row 3
    label = rowDes[6].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 1 Parent Row 3');
    
    // Expand child row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(8);

    label = rowDes[7].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 2 Child 1 (PR3)');
    
    // Expand grandchild row
    label.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    rowDes = calGridDe.queryAll(By.css('cr-calendar-grid-row'));
    expect(rowDes.length).toEqual(9);

    label = rowDes[8].query(By.css('cr-calendar-grid-label')).nativeElement;
    expect(label.innerText).toEqual('Row 3 labelTpl 3 Grandchild 1 (PR3-C1)');
    
    cellDes = rowDes[8].queryAll(By.css('cr-calendar-grid-cell'));
    expect(cellDes.length).toEqual(7);
    expect(cellDes[0].nativeElement.innerText).toEqual('Row 3 cellTpl 3 4');
  });
});

@Component({selector: 'test-calendar-grid', template: ''})
class TestCalendarGridComponent {
  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());
}