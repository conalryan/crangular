import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarGridExComponent } from './calendar-grid-ex/calendar-grid-ex.component';
import { BitsExComponent } from './bits-ex/bits-ex.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-grid', pathMatch: 'full' },
  {
    path: 'bits',
    component: BitsExComponent
  },
  {
    path: 'calendar-grid',
    component: CalendarGridExComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
