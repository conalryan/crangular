import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarGridModule } from 'projects/crangular/src/lib/calendar-grid/calendar-grid.module';
import { CalendarGridExRoutingModule } from './calendar-grid-ex-routing.module';
import { CalendarGridModelExComponent } from './calendar-grid-model-ex.component';
import { MultiRowTemplateComponent } from './multi-row-template.component';
import { NestedRowTemplateComponent } from './nested-row-template.component';
import { NoTemplatesComponent } from './no-templates.component';
import { PartsComponent } from './parts.component';
import { SingleRowTemplateComponent } from './single-row-template.component';

@NgModule({
  declarations: [
    PartsComponent,
    CalendarGridModelExComponent,
    NoTemplatesComponent,
    SingleRowTemplateComponent,
    MultiRowTemplateComponent,
    NestedRowTemplateComponent
  ],
  imports: [
    CommonModule,
    CalendarGridExRoutingModule,
    CalendarGridModule
  ]
})
export class CalendarGridExModule { }
