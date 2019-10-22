import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendargridExComponent } from './calendar-grid/calendar-grid-ex.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-grid', pathMatch: 'full' },
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
