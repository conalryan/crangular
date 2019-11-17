import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitsExComponent } from './bits-ex/bits-ex.component';
import { CalendarGridExComponent } from './calendar-grid-ex/calendar-grid-ex.component';
import { NoTemplatesComponent } from './calendar-grid-ex/no-templates.component';
import { PartsComponent } from './calendar-grid-ex/parts.component';
import { SingleTemplatePerLevelComponent } from './calendar-grid-ex/single-template-per-level.component';
import { SingleTemplateComponent } from './calendar-grid-ex/single-template.component';
import { TemplatePerParentComponent } from './calendar-grid-ex/template-per-parent.component';
import { TemplatePerRowComponent } from './calendar-grid-ex/template-per-row.component';
import { DirectivesExComponent } from './directives-ex/directives-ex.component';
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
    path: 'calendar-grid/parts',
    component: PartsComponent
  },
  {
    path: 'calendar-grid/no-templates',
    component: NoTemplatesComponent
  },
  {
    path: 'calendar-grid/single-template',
    component: SingleTemplateComponent
  },
  {
    path: 'calendar-grid/single-template-per-level',
    component: SingleTemplatePerLevelComponent
  },
  {
    path: 'calendar-grid/template-per-row',
    component: TemplatePerRowComponent
  },
  {
    path: 'calendar-grid/template-per-parent',
    component: TemplatePerParentComponent
  },
  {
    path: 'directives',
    component: DirectivesExComponent
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
