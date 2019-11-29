import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerScaleDirective } from './datepicker-scale.directive';

describe('DatepickerScaleDirective', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
   
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerScaleDirective, DummyComponent],
      imports: [NgbDatepickerModule]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should scale single month', () => {
    const ngbDatepickerEl = fixture.debugElement.query(By.css('#one-month'));
    expect(ngbDatepickerEl.attributes['ng-reflect-scale']).toEqual('1.5');
    expect(ngbDatepickerEl.attributes['ng-reflect-months-per-row']).toEqual('1');

    const ngbDpMonthsEl: HTMLElement = ngbDatepickerEl.query(By.css('.ngb-dp-months')).nativeElement;
    expect(ngbDpMonthsEl.classList.contains('row'));

    const ngbDpMonthEl: HTMLElement = ngbDatepickerEl.query(By.css('.ngb-dp-month')).nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-12'));

    const ngbDpDayDes: DebugElement[] = ngbDatepickerEl.queryAll(By.css('.ngb-dp-day'));
    const ngbDpDayEl: HTMLElement = ngbDpDayDes[21].nativeElement;
    
    expect(ngbDpDayEl.style.width).toEqual('3rem');
  });

  it('should scale four months in 2 rows static', () => {
    const ngbDatepickerEl = fixture.debugElement.query(By.css('#four-months-static'));
    expect(ngbDatepickerEl.attributes['ng-reflect-scale']).toEqual('3');
    expect(ngbDatepickerEl.attributes['ng-reflect-months-per-row']).toEqual('2');

    const ngbDpMonthsEl: HTMLElement = ngbDatepickerEl.query(By.css('.ngb-dp-months')).nativeElement;
    expect(ngbDpMonthsEl.classList.contains('row'));

    const ngbDpMonthDes: DebugElement[] = ngbDatepickerEl.queryAll(By.css('.ngb-dp-month'));
    expect(ngbDpMonthDes.length).toEqual(4);

    let ngbDpMonthEl: HTMLElement = ngbDpMonthDes[0].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-6'));

    ngbDpMonthEl = ngbDpMonthDes[1].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-6'));

    ngbDpMonthEl = ngbDpMonthDes[2].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-6'));

    ngbDpMonthEl = ngbDpMonthDes[3].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-6'));

    const ngbDpDayDes: DebugElement[] = ngbDatepickerEl.queryAll(By.css('.ngb-dp-day'));
    const ngbDpDayEl: HTMLElement = ngbDpDayDes[21].nativeElement;
    
    expect(ngbDpDayEl.style.width).toEqual('6rem');
  });

  it('should scale six months in 2 rows static', () => {
    const ngbDatepickerEl = fixture.debugElement.query(By.css('#six-months-static'));
    expect(ngbDatepickerEl.attributes['ng-reflect-scale']).toEqual('2');
    expect(ngbDatepickerEl.attributes['ng-reflect-months-per-row']).toEqual('3');

    const ngbDpMonthsEl: HTMLElement = ngbDatepickerEl.query(By.css('.ngb-dp-months')).nativeElement;
    expect(ngbDpMonthsEl.classList.contains('row'));

    const ngbDpMonthDes: DebugElement[] = ngbDatepickerEl.queryAll(By.css('.ngb-dp-month'));
    expect(ngbDpMonthDes.length).toEqual(6);

    let ngbDpMonthEl: HTMLElement = ngbDpMonthDes[0].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-4'));

    ngbDpMonthEl = ngbDpMonthDes[1].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-4'));

    ngbDpMonthEl = ngbDpMonthDes[2].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-4'));

    ngbDpMonthEl = ngbDpMonthDes[3].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-4'));

    ngbDpMonthEl = ngbDpMonthDes[4].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-4'));

    ngbDpMonthEl = ngbDpMonthDes[5].nativeElement;
    expect(ngbDpMonthEl.classList.contains('col-4'));

    const ngbDpDayDes: DebugElement[] = ngbDatepickerEl.queryAll(By.css('.ngb-dp-day'));
    const ngbDpDayEl: HTMLElement = ngbDpDayDes[21].nativeElement;
    
    expect(ngbDpDayEl.style.width).toEqual('4rem');
  });
});

@Component({
    selector: 'dummy',
    template: `
      <h3>One Month</h3>
      <ngb-datepicker
        id="one-month"
        [displayMonths]="1"
        [firstDayOfWeek]="7"
        [maxDate]="maxApr"
        [minDate]="minNov"
        [monthsPerRow]="1"
        [navigation]="'arrows'"
        [scale]="1.5" 
        [startDate]="minNov">
      </ngb-datepicker>
      
      <h3>Four Months Static</h3>
      <ngb-datepicker
        id="four-months-static"
        [displayMonths]="4"
        [firstDayOfWeek]="7"
        [maxDate]="maxNov"
        [minDate]="minNov"
        [monthsPerRow]="2"
        [navigation]="'none'"
        [outsideDays]="'hidden'"
        [scale]="3">
      </ngb-datepicker>
      
      <h3>Six Months Static</h3>
      <ngb-datepicker
        id="six-months-static"
        [displayMonths]="6"
        [firstDayOfWeek]="7"
        [maxDate]="maxFeb"
        [minDate]="minNov"
        [monthsPerRow]="3"
        [navigation]="'none'"
        [outsideDays]="'hidden'"
        [scale]="2">
      </ngb-datepicker>
    `
  })
  export class DummyComponent {
  
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
    }
  }
  