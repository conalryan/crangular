import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-grid', pathMatch: 'full' },
  {
    path: 'bits',
    loadChildren: './bits-ex/bits-ex.module#BitsExModule'
  },
  {
    path: 'calendar',
    loadChildren: './calendar-ex/calendar-ex.module#CalendarExModule'
  },
  {
    path: 'calendar-grid',
    loadChildren: './calendar-grid-ex/calendar-grid-ex.module#CalendarGridExModule'
  },
  {
    path: 'directives',
    loadChildren: './directives-ex/directives-ex.module#DirectivesExModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
