import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitsExComponent } from './bits-ex/bits-ex.component';
import { CalendarGridExComponent } from './calendar-grid-ex/calendar-grid-ex.component';
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
    path: 'sizeof',
    component: SizeofExComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
