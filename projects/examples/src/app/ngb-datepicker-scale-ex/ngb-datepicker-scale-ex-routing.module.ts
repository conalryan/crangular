import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepicker3MonthExComponent } from './ngb-datepicker-3-month-ex.component';
import { NgbDatepicker6MonthExComponent } from './ngb-datepicker-6-month-ex.component';
import { NgbDatepicker6MonthSplitExComponent } from './ngb-datepicker-6-month-split-ex.component';
import { NgbDatepickerPerMonthExComponent } from './ngb-datepicker-per-month-ex.component';
import { NgbDatepickerScaleExComponent } from './ngb-datepicker-scale-ex.component';

const routes: Routes = [
  {
    path: '',
    component: NgbDatepickerScaleExComponent
  },
  {
    path: 'ngb-datepicker-3-month',
    component: NgbDatepicker3MonthExComponent
  },
  {
    path: 'ngb-datepicker-6-month',
    component: NgbDatepicker6MonthExComponent
  },
  {
    path: 'ngb-datepicker-6-month-split',
    component: NgbDatepicker6MonthSplitExComponent
  },
  {
    path: 'ngb-datepicker-per-month',
    component: NgbDatepickerPerMonthExComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgbDatepickerScaleExRoutingModule { }
