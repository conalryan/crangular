import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExCalendargridComponent } from './ex-calendargrid.component';

const routes: Routes = [
  {
    path: '',
    component: ExCalendargridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExCalendargridRoutingModule { }
