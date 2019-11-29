import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar.component';
import { DatepickerScaleDirective } from './datepicker-scale.directive';

@NgModule({
  declarations: [CalendarComponent, DatepickerScaleDirective],
  exports: [NgbDatepickerModule, CalendarComponent, DatepickerScaleDirective],
  imports: [
    CommonModule,
    NgbDatepickerModule
  ]
})
export class CalendarModule { }
