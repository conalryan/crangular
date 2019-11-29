import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarGridModule } from 'projects/crangular/src/lib/calendar-grid/calendar-grid.module';
import { CalendarGridExRoutingModule } from './calendar-grid-ex-routing.module';
import { CalendarGridExComponent } from './calendar-grid-ex.component';
import { NoTemplatesComponent } from './no-templates.component';
import { PartsComponent } from './parts.component';
import { SingleTemplatePerLevelComponent } from './single-template-per-level.component';
import { SingleTemplateComponent } from './single-template.component';
import { TemplatePerParentComponent } from './template-per-parent.component';
import { TemplatePerRowComponent } from './template-per-row.component';

@NgModule({
  declarations: [
    CalendarGridExComponent,
    NoTemplatesComponent,
    PartsComponent,
    SingleTemplatePerLevelComponent,
    SingleTemplateComponent,
    TemplatePerParentComponent,
    TemplatePerRowComponent
  ],
  imports: [
    CommonModule,
    CalendarGridExRoutingModule,
    CalendarGridModule
  ]
})
export class CalendarGridExModule { }
