import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitsExComponent } from './bits-ex/bits-ex.component';
import { CalendarGridExComponent } from './calendar-grid-ex/calendar-grid-ex.component';
import { NoTemplatesComponent } from './calendar-grid-ex/no-templates.component';
import { PartsComponent } from './calendar-grid-ex/parts.component';
import { SingleTemplatePerLevelComponent } from './calendar-grid-ex/single-template-per-level.component';
import { SingleTemplateComponent } from './calendar-grid-ex/single-template.component';
import { TemplatePerParentComponent } from './calendar-grid-ex/template-per-parent.component';
import { TemplatePerRowComponent } from './calendar-grid-ex/template-per-row.component';
import { DirectivesExComponent } from './directives-ex/directives-ex.component';
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
    component: BitsExComponent
  },
  {
    path: 'calendar-grid',
    component: CalendarGridExComponent
  },
  {
    path: 'calendar-grid/parts',
    component: PartsComponent
  },
  {
    path: 'calendar-grid/no-templates',
    component: NoTemplatesComponent
  },
  {
    path: 'calendar-grid/single-template',
    component: SingleTemplateComponent
  },
  {
    path: 'calendar-grid/single-template-per-level',
    component: SingleTemplatePerLevelComponent
  },
  {
    path: 'calendar-grid/template-per-row',
    component: TemplatePerRowComponent
  },
  {
    path: 'calendar-grid/template-per-parent',
    component: TemplatePerParentComponent
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
