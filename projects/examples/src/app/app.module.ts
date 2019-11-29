import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
=======
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> Feature ngb-datepicker-scale directive
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
=======
    NgbDropdownModule,
>>>>>>> Feature ngb-datepicker-scale directive
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
