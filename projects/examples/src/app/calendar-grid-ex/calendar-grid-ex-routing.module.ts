import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarGridModelExComponent } from './calendar-grid-model-ex.component';
import { MultiRowTemplateComponent } from './multi-row-template.component';
import { NestedRowTemplateComponent } from './nested-row-template.component';
import { NoTemplatesComponent } from './no-templates.component';
import { PartsComponent } from './parts.component';
import { SingleRowTemplateComponent } from './single-row-template.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'single-template'
  },
  {
    path: 'parts',
    component: PartsComponent
  },
  {
    path: 'model',
    component: CalendarGridModelExComponent
  },
  {
    path: 'no-templates',
    component: NoTemplatesComponent
  },
  {
    path: 'single-row-template',
    component: SingleRowTemplateComponent
  },
  {
    path: 'multi-row-template',
    component: MultiRowTemplateComponent
  },
  {
    path: 'nested-row-template',
    component: NestedRowTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarGridExRoutingModule { }
