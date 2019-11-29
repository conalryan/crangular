import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'ngb-datepicker-scale',
    loadChildren: './ngb-datepicker-scale-ex/ngb-datepicker-scale-ex.module#NgbDatepickerScaleExModule'
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
