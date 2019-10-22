import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarGridModule } from '../../../crangular/src/lib/calendar-grid/calendar-grid.module';
import { BitsModule } from '../../../crangular/src/lib/bits/bits.module';
import { BitsExComponent } from './bits-ex/bits-ex.component';
import { CalendarGridExComponent } from './calendar-grid-ex/calendar-grid-ex.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarGridExComponent,
    BitsExComponent
  ],
  imports: [
    BrowserModule,
    BitsModule,
    CalendarGridModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
