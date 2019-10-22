import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendargridExComponent } from './calendar-grid/calendar-grid-ex.component';
import { CalendargridModule } from '../../../crangular/src/lib/calendargrid/calendargrid.module';

@NgModule({
  declarations: [
    AppComponent,
    CalendargridExComponent
  ],
  imports: [
    BrowserModule,
    CalendargridModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
