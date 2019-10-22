import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendargridExComponent } from './calendar-grid/calendar-grid-ex.component';
import { BitsExComponent } from './bits-ex/bits-ex.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-grid', pathMatch: 'full' },
  {
    path: 'bits',
    component: BitsExComponent
  },
  {
    path: 'calendar-grid',
    component: CalendargridExComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
