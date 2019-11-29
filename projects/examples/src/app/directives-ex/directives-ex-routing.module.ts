import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivesExComponent } from './directives-ex.component';

const routes: Routes = [
  {
    path: '',
    component: DirectivesExComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectivesExRoutingModule { }
