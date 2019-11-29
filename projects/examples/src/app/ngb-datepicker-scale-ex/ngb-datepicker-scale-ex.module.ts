import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDatepickerScaleModule } from 'projects/crangular/src/lib/ngb-datepicker-scale/ngb-datepicker-scale.module';
import { NgbDatepicker3MonthExComponent } from './ngb-datepicker-3-month-ex.component';
import { NgbDatepicker6MonthExComponent } from './ngb-datepicker-6-month-ex.component';
import { NgbDatepicker6MonthSplitExComponent } from './ngb-datepicker-6-month-split-ex.component';
import { NgbDatepickerPerMonthExComponent } from './ngb-datepicker-per-month-ex.component';
import { NgbDatepickerScaleExRoutingModule } from './ngb-datepicker-scale-ex-routing.module';
import { NgbDatepickerScaleExComponent } from './ngb-datepicker-scale-ex.component';

@NgModule({
  declarations: [
    NgbDatepicker3MonthExComponent,
    NgbDatepicker6MonthExComponent,
    NgbDatepicker6MonthSplitExComponent,
    NgbDatepickerPerMonthExComponent,
    NgbDatepickerScaleExComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerScaleExRoutingModule,
    NgbDatepickerScaleModule
  ]
})
export class NgbDatepickerScaleExModule { }
