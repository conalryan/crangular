import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-ex',
  template: `
    <div class="m-3">
      <p>To scale ngb-datepicker add the [scale] attribute and optionally [monthsPerRow] atrribute if you want to break months per rows</p>
      <p>To style ngb-datepicker wrap in cr-calendar element</p>

      <ng-template #customDay let-date let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
        <span class="custom-day-co">
          <span class="d-block">{{ date.day }}</span>
          <span class="d-block custom-cell-co">{{ cell(date) | number: '1.2'}}</span>
        </span>
      </ng-template>

      <div class="row">
        <div class="col-4">
          <h3>One Month 2X Unstyled</h3>
          <ngb-datepicker
            [dayTemplate]="customDay"
            [displayMonths]="1"
            [firstDayOfWeek]="7"
            [maxDate]="maxNov"
            [minDate]="minNov"
            [navigation]="'select'"
            [outsideDays]="'hidden'"
            [scale]="2" 
            (navigate)="onNavigate($event)"
            (select)="onSelect($event)">
          </ngb-datepicker>
        </div>

        <div class="col-4">
          <h3>One Month 2.5X Styled</h3>
          <cr-calendar>
            <ngb-datepicker
              [dayTemplate]="customDay"
              [displayMonths]="1"
              [firstDayOfWeek]="7"
              [maxDate]="maxApr"
              [minDate]="minNov"

              [navigation]="'arrows'"
              [scale]="2.5" 
              [startDate]="minNov"
              (navigate)="onNavigate($event)"
              (select)="onSelect($event)">
            </ngb-datepicker>
          </cr-calendar>
        </div>

        <div class="col-4">
          <h3>One Month 3X Styled Static</h3>
          <cr-calendar>
            <ngb-datepicker
              [dayTemplate]="customDay"
              [displayMonths]="1"
              [firstDayOfWeek]="7"
              [maxDate]="maxNov"
              [minDate]="minNov"
              [monthsPerRow]="1"
              [navigation]="'none'"
              [outsideDays]="'hidden'"
              [scale]="3" 
              (navigate)="onNavigate($event)"
              (select)="onSelect($event)">
            </ngb-datepicker>
          </cr-calendar>
        </div>
      </div>

      <div class="row">

        <div class="col-4">
          <pre>
            <code>
              &lt;ngb-datepicker
                [dayTemplate]="customDay"
                [displayMonths]="1"
                [firstDayOfWeek]="7"
                [maxDate]="maxNov"
                [minDate]="minNov"
                [monthsPerRow]="1"
                [navigation]="'select'"
                [outsideDays]="'hidden'"
                [scale]="2" 
                (navigate)="onNavigate($event)"
                (select)="onSelect($event)"&gt;
              &lt;/ngb-datepicker>
            </code>
          </pre>
        </div>

        <div class="col-4">
          <pre>
            <code>
              &lt;cr-calendar&gt;
                &lt;ngb-datepicker
                  [dayTemplate]="customDay"
                  [displayMonths]="1"
                  [firstDayOfWeek]="7"
                  [maxDate]="maxApr"
                  [minDate]="minNov"
                  [monthsPerRow]="1"
                  [navigation]="'arrows'"
                  [scale]="2.5" 
                  [startDate]="minNov"
                  (navigate)="onNavigate($event)"
                  (select)="onSelect($event)"&gt;
                &lt;/ngb-datepicker&gt;
              &lt;/cr-calendar&gt;
            </code>
          </pre>
        </div>

        <div class="col-4">
          <pre>
            <code>
              &lt;cr-calendar&gt;
                &lt;ngb-datepicker
                  [dayTemplate]="customDay"
                  [displayMonths]="1"
                  [firstDayOfWeek]="7"
                  [maxDate]="maxNov"
                  [minDate]="minNov"
                  [monthsPerRow]="1"
                  [navigation]="'none'"
                  [outsideDays]="'hidden'"
                  [scale]="3" 
                  (navigate)="onNavigate($event)"
                  (select)="onSelect($event)"&gt;
                &lt;/ngb-datepicker&gt;
              &lt;/cr-calendar&gt;
            </code>
          </pre>
        </div>
      </div>

      <h3>Six Months 3X Styled Static</h3>
      <cr-calendar>
        <ngb-datepicker
          [dayTemplate]="customDay"
          [displayMonths]="6"
          [firstDayOfWeek]="7"
          [maxDate]="maxFeb"
          [minDate]="minNov"
          [monthsPerRow]="3"
          [navigation]="'none'"
          [outsideDays]="'hidden'"
          [scale]="3" 
          (navigate)="onNavigate($event)"
          (select)="onSelect($event)">
        </ngb-datepicker>
      </cr-calendar>

      <pre>
        <code>
          &lt;cr-calendar&gt;
            &lt;ngb-datepicker
              [dayTemplate]="customDay"
              [displayMonths]="6"
              [firstDayOfWeek]="7"
              [maxDate]="maxFeb"
              [minDate]="minNov"
              [monthsPerRow]="3"
              [navigation]="'none'"
              [outsideDays]="'hidden'"
              [scale]="3" 
              (navigate)="onNavigate($event)"
              (select)="onSelect($event)"&gt;
            &lt;/ngb-datepicker&gt;
          &lt;/cr-calendar&gt;
        </code>
      </pre>
      
      <h4>Styles do not leak to other ngb-datepickers</h4>
      <ngb-datepicker
        [displayMonths]="1"
        [firstDayOfWeek]="7"
        [maxDate]="maxApr"
        [minDate]="minNov"
        [startDate]="minNov"
        (navigate)="onNavigate($event)"
        (select)="onSelect($event)">
      </ngb-datepicker>
    </div>
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
    pre {
      background-color: #d2d2d2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarExComponent {

  cells = [];
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

  private _generateData(year: number, month: number, days: number) {
    const cells = [];
    for (let i = 1; i <= days; i++) {
      const d = new Date(year, month, i, 12);
      const cell = {
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
      return cell.date.getFullYear() === date.year && cell.date.getMonth() + 1 === date.month && cell.date.getDate() === date.day;
    });
    return cell ? cell.value : 0;
  }
}
