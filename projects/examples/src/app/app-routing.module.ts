import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepicker3MonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-3-month-ex.component';
import { NgbDatepicker6MonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-6-month-ex.component';
import { NgbDatepicker6MonthSplitExComponent } from './ngb-datepicker-ex/ngb-datepicker-6-month-split-ex.component';
import { NgbDatepickerPerMonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-per-month-ex.component';
import { NgbDatepickerScaleExComponent } from './ngb-datepicker-scale-ex/ngb-datepicker-scale-ex.component';
import { SizeofExComponent } from './sizeof-ex/sizeof-ex.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-grid', pathMatch: 'full' },
  {
    path: 'bits',
    loadChildren: './bits-ex/bits-ex.module#BitsExModule'
  },
  {
    path: 'calendar-grid',
    loadChildren: './calendar-grid-ex/calendar-grid-ex.module#CalendarGridExModule'
  },
  {
    path: 'directives',
    loadChildren: './directives-ex/directives-ex.module#DirectivesExModule'
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
  },
  {
    path: 'ngb-datepicker-scale',
    component: NgbDatepickerScaleExComponent
  },
  {
    path: 'sizeof',
    component: SizeofExComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
