import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'calendargrid', pathMatch: 'full' },
  {
    path: 'calendargrid',
    loadChildren: './calendargrid/ex-calendargrid.module#ExCalendargridModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
