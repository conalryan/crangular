import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarGridCell } from '../calendar-grid/calendar-grid';
import { DateUtil } from '../util/date.util';
import { CalendarComponent } from './calendar.component';
import { DatepickerScaleDirective } from './datepicker-scale.directive';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent, DatepickerScaleDirective, CalendarExComponent ],
      imports: [NgbDatepickerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarExComponent);
    fixture.detectChanges();
  });

  it('should override classes with navigation', () => {
    const calendarDe: DebugElement = fixture.debugElement.query(By.css('#one-month'));
    const ngbDatepicker: HTMLElement = calendarDe.query(By.css('ngb-datepicker')).nativeElement;
    expect(ngbDatepicker.classList.contains('cr-calendar'));
  });

  it('should override classes without navigation', () => {
    const calendarDe: DebugElement = fixture.debugElement.query(By.css('#one-month-static'));
    const ngbDatepicker: HTMLElement = calendarDe.query(By.css('ngb-datepicker')).nativeElement;
    expect(ngbDatepicker.classList.contains('cr-calendar'));
  });

  it('should override classes across multiple months', () => {
    const calendarDe: DebugElement = fixture.debugElement.query(By.css('#six-months-static'));
    const ngbDatepicker: HTMLElement = calendarDe.query(By.css('ngb-datepicker')).nativeElement;
    expect(ngbDatepicker.classList.contains('cr-calendar'));
  });

  it('should not leak styles', () => {
    const ngbDatepicker: HTMLElement = fixture.debugElement.query(By.css('#ngb-datepicker')).nativeElement;
    expect(ngbDatepicker.classList.contains('cr-calendar'));
  });
});

@Component({
  selector: 'cr-calendar-ex',
  template: `
    <ng-template #customDay let-date let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
      <span class="custom-day-co">
        <span class="d-block">{{ date.day }}</span>
        <span class="d-block custom-cell-co">{{ cell(date) | number: '1.2'}}</span>
      </span>
    </ng-template>

    <h3>One Month</h3>
    <cr-calendar id="one-month">
      <ngb-datepicker
        [dayTemplate]="customDay"
        [displayMonths]="1"
        [firstDayOfWeek]="7"
        [maxDate]="maxApr"
        [minDate]="minNov"
        [monthsPerRow]="1"
        [navigation]="'arrows'"
        [scale]="2" 
        [startDate]="minNov"
        (navigate)="onNavigate($event)"
        (select)="onSelect($event)">
      </ngb-datepicker>
    </cr-calendar>

    <h3>One Month Static</h3>
    <cr-calendar id="one-month-static">
      <ngb-datepicker
        [dayTemplate]="customDay"
        [displayMonths]="1"
        [firstDayOfWeek]="7"
        [maxDate]="maxNov"
        [minDate]="minNov"
        [monthsPerRow]="1"
        [navigation]="'none'"
        [outsideDays]="'hidden'"
        [scale]="2" 
        (navigate)="onNavigate($event)"
        (select)="onSelect($event)">
      </ngb-datepicker>
    </cr-calendar>

    <h3>Six Months Static</h3>
    <cr-calendar id="six-months-static">
      <ngb-datepicker
        [dayTemplate]="customDay"
        [displayMonths]="6"
        [firstDayOfWeek]="7"
        [maxDate]="maxFeb"
        [minDate]="minNov"
        [monthsPerRow]="3"
        [navigation]="'none'"
        [outsideDays]="'hidden'"
        [scale]="2" 
        (navigate)="onNavigate($event)"
        (select)="onSelect($event)">
      </ngb-datepicker>
    </cr-calendar>
    
    <h4>Styles do not leak to other ngb-datepickers</h4>
    <ngb-datepicker
      id="ngb-datepicker"
      [displayMonths]="1"
      [firstDayOfWeek]="7"
      [maxDate]="maxApr"
      [minDate]="minNov"
      [startDate]="minNov"
      (navigate)="onNavigate($event)"
      (select)="onSelect($event)">
    </ngb-datepicker>
  `,
  styles: [`
    h3, h4 {
      margin-top: 2rem;
    }
    .custom-day-co {
      background-color: #d2d2d2;
      text-align: center;
    }
    .custom-cell-co {
      color: blue;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarExComponent {

  cells: CalendarGridCell<number>[] = [];
  minNov = new NgbDate(2019, 11, 1);
  maxNov = new NgbDate(2019, 11, 30);

  minDec = new NgbDate(2019, 12, 1);
  maxDec = new NgbDate(2019, 12, 31);

  minJan = new NgbDate(2020, 1, 1);
  maxJan = new NgbDate(2020, 1, 31);

  minFeb = new NgbDate(2020, 2, 1);
  maxFeb = new NgbDate(2020, 2, 29);

  minMar = new NgbDate(2020, 3, 1);
  maxMar = new NgbDate(2020, 3, 31);

  maxApr = new NgbDate(2020, 4, 30);

  showWeekdays = true;
  showWeekNumbers = false;

  constructor() {
    const nov = this._generateData(2019, 10, 30);
    const dec = this._generateData(2019, 11, 31);
    const jan = this._generateData(2020, 0, 31);
    this.cells = [].concat(nov, dec, jan);
  }

  onNavigate($event): void {
    console.log($event);
  }

  onSelect($event: any): void {
    console.log($event);
  }

  private _generateData(year: number, month: number, days: number): CalendarGridCell<number>[] {
    const cells: CalendarGridCell<number>[] = [];
    for (let i = 1; i <= days; i++) {
      const d = new Date(year, month, i, 12);
      const cell: CalendarGridCell<number> = {
        label: d.toISOString(),
        date: d,
        value: Math.random() * 100
      };
      cells.push(cell);
    }
    return cells;
  }

  cell(date: NgbDate): any {
    const cell = this.cells.find(cell => {
      return DateUtil.areDatesEqual(DateUtil.dateToNgbDateStruct(cell.date), date);
    });
    return cell ? cell.value : 0;
  }
}
