import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitsExComponent } from './bits-ex.component';
import { SizeofExComponent } from './sizeof-ex.component';

const routes: Routes = [
  {
    path: '',
    component: BitsExComponent
  },
  {
    path: 'sizeof',
    component: SizeofExComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitsExRoutingModule { }
