import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarExComponent } from './calendar-ex.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarExComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarExRoutingModule { }
