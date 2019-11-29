import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarGridExComponent } from './calendar-grid-ex.component';
import { NoTemplatesComponent } from './no-templates.component';
import { PartsComponent } from './parts.component';
import { SingleTemplatePerLevelComponent } from './single-template-per-level.component';
import { SingleTemplateComponent } from './single-template.component';
import { TemplatePerParentComponent } from './template-per-parent.component';
import { TemplatePerRowComponent } from './template-per-row.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarGridExComponent
  },
  {
    path: 'parts',
    component: PartsComponent
  },
  {
    path: 'no-templates',
    component: NoTemplatesComponent
  },
  {
    path: 'single-template',
    component: SingleTemplateComponent
  },
  {
    path: 'single-template-per-level',
    component: SingleTemplatePerLevelComponent
  },
  {
    path: 'template-per-row',
    component: TemplatePerRowComponent
  },
  {
    path: 'template-per-parent',
    component: TemplatePerParentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarGridExRoutingModule { }
