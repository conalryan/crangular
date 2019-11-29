import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-grid', pathMatch: 'full' },
  {
    path: 'bits',
    loadChildren: './bits-ex/bits-ex.module#BitsExModule'
  },
  {
<<<<<<< HEAD
=======
    path: 'calendar',
    loadChildren: './calendar-ex/calendar-ex.module#CalendarExModule'
  },
  {
>>>>>>> Feature ngb-datepicker-scale directive
    path: 'calendar-grid',
    loadChildren: './calendar-grid-ex/calendar-grid-ex.module#CalendarGridExModule'
  },
  {
    path: 'directives',
    loadChildren: './directives-ex/directives-ex.module#DirectivesExModule'
<<<<<<< HEAD
  },
  {
    path: 'ngb-datepicker-scale',
    loadChildren: './ngb-datepicker-scale-ex/ngb-datepicker-scale-ex.module#NgbDatepickerScaleExModule'
=======
>>>>>>> Feature ngb-datepicker-scale directive
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
