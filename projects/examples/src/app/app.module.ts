import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerScaleModule } from 'projects/crangular/src/lib/ngb-datepicker-scale/ngb-datepicker-scale.module';
import { CalendarGridModule } from '../../../crangular/src/lib/calendar-grid/calendar-grid.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BitsExModule } from './bits-ex/bits-ex.module';
import { CalendarGridExComponent } from './calendar-grid-ex/calendar-grid-ex.component';
import { NoTemplatesComponent } from './calendar-grid-ex/no-templates.component';
import { PartsComponent } from './calendar-grid-ex/parts.component';
import { SingleTemplatePerLevelComponent } from './calendar-grid-ex/single-template-per-level.component';
import { SingleTemplateComponent } from './calendar-grid-ex/single-template.component';
import { TemplatePerParentComponent } from './calendar-grid-ex/template-per-parent.component';
import { TemplatePerRowComponent } from './calendar-grid-ex/template-per-row.component';
import { NgbDatepicker3MonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-3-month-ex.component';
import { NgbDatepicker6MonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-6-month-ex.component';
import { NgbDatepicker6MonthSplitExComponent } from './ngb-datepicker-ex/ngb-datepicker-6-month-split-ex.component';
import { NgbDatepickerPerMonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-per-month-ex.component';
import { NgbDatepickerScaleExComponent } from './ngb-datepicker-scale-ex/ngb-datepicker-scale-ex.component';
import { SizeofExComponent } from './sizeof-ex/sizeof-ex.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarGridExComponent,
    SizeofExComponent,
    NoTemplatesComponent,
    PartsComponent,
    SingleTemplateComponent,
    SingleTemplatePerLevelComponent,
    TemplatePerRowComponent,
    TemplatePerParentComponent,
    NgbDatepicker3MonthExComponent,
    NgbDatepicker6MonthExComponent,
    NgbDatepickerPerMonthExComponent,
    NgbDatepicker6MonthSplitExComponent,
    NgbDatepickerScaleExComponent
  ],
  imports: [
    BrowserModule,
    BitsExModule,
    NgbDatepickerModule,
    CalendarGridModule,
    NgbDatepickerScaleModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
