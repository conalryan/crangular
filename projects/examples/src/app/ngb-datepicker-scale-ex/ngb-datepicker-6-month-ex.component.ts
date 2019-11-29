import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CalendarGridCell } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';
import { DateUtil } from '../../../../crangular/src/lib/util/date.util';

@Component({
  selector: 'cr-ngb-datepicker-6-month-ex',
  template: `
    <ngb-datepicker
      class="dp"
      [dayTemplate]="customDay"
      [displayMonths]="6"
      [firstDayOfWeek]="7"
      [maxDate]="maxApr"
      [minDate]="minNov"
      [navigation]="'none'"
      [outsideDays]="'hidden'"
      [startDate]="minNov"
      (navigate)="onNavigate($event)"
      (select)="onSelect($event)">
    </ngb-datepicker>

    <ng-template #customDay let-date let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
      <span class="custom-day">
        <span class="d-block">{{ date.day }}</span>
        <span class="d-block">{{ cell(date) | number: '1.2'}}</span>
      </span>
    </ng-template>
  `,
  styles: [`
    .dp {
        border: none;
    }
    .dp .bg-light {
      background-color: inherit !important;
    }
    .dp .ngb-dp-month {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    .dp .ngb-dp-weekdays {
      border-bottom: none;
      border-radius: 0;
    }
    .dp .ngb-dp-weekday {
      color: inherit;
    }
    .dp .ngb-dp-day, .dp .ngb-dp-week-number, .dp .ngb-dp-weekday {
      width: 3.5rem;
      height: 3.5rem;
    }
    .custom-day {
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgbDatepicker6MonthExComponent implements AfterViewInit {

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

  constructor(private readonly _elementRef: ElementRef, private readonly _renderer: Renderer2) {
    const nov = this.generateData(2019, 10, 30);
    const dec = this.generateData(2019, 11, 31);
    const jan = this.generateData(2020, 0, 31);
    this.cells = [].concat(nov, dec, jan);
  }

  ngAfterViewInit(): void {
    const ngbDatepickerNode = this._elementRef.nativeElement.childNodes[0];
    const month4 = ngbDatepickerNode.childNodes[2].childNodes[4];
    const month5 = ngbDatepickerNode.childNodes[2].childNodes[5];
    const month6 = ngbDatepickerNode.childNodes[2].childNodes[6];

    const currentParent = ngbDatepickerNode.childNodes[2];
    this._renderer.removeChild(currentParent, month4);
    this._renderer.removeChild(currentParent, month5);
    this._renderer.removeChild(currentParent, month6);

    const newParent = this._renderer.createElement('div');
    this._renderer.addClass(newParent, 'ngb-dp-months');
    this._renderer.appendChild(ngbDatepickerNode, newParent);
    this._renderer.appendChild(newParent, month4);
    this._renderer.appendChild(newParent, month5);
    this._renderer.appendChild(newParent, month6);
  }

  onNavigate($event): void {
    console.log($event);
  }

  onSelect($event: any): void {
    console.log($event);
  }

  generateData(year: number, month: number, days: number): CalendarGridCell<number>[] {
    const cells: CalendarGridCell<number>[] = [];
    for (let i = 1; i <= days; i++) {
      const d = new Date(year, month, i, 12);
      const cell: CalendarGridCell<number> = {
        id: d.toISOString(),
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
