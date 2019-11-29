import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerScaleModule } from 'projects/crangular/src/lib/ngb-datepicker-scale/ngb-datepicker-scale.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BitsExModule } from './bits-ex/bits-ex.module';
import { CalendarGridExModule } from './calendar-grid-ex/calendar-grid-ex.module';
import { NgbDatepicker3MonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-3-month-ex.component';
import { NgbDatepicker6MonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-6-month-ex.component';
import { NgbDatepicker6MonthSplitExComponent } from './ngb-datepicker-ex/ngb-datepicker-6-month-split-ex.component';
import { NgbDatepickerPerMonthExComponent } from './ngb-datepicker-ex/ngb-datepicker-per-month-ex.component';
import { NgbDatepickerScaleExComponent } from './ngb-datepicker-scale-ex/ngb-datepicker-scale-ex.component';
import { SizeofExComponent } from './sizeof-ex/sizeof-ex.component';

@NgModule({
  declarations: [
    AppComponent,
    SizeofExComponent,
    NgbDatepicker3MonthExComponent,
    NgbDatepicker6MonthExComponent,
    NgbDatepickerPerMonthExComponent,
    NgbDatepicker6MonthSplitExComponent,
    NgbDatepickerScaleExComponent
  ],
  imports: [
    BrowserModule,
    BitsExModule,
    CalendarGridExModule,
    NgbDatepickerModule,
    NgbDatepickerScaleModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
