import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BitsModule } from '../../../crangular/src/lib/bits/bits.module';
import { CalendarGridModule } from '../../../crangular/src/lib/calendar-grid/calendar-grid.module';
import { DirectivesModule } from '../../../crangular/src/lib/directives/directives.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { DirectivesExComponent } from './directives-ex/directives-ex.component';
import { DirectivesModule } from '../../../crangular/src/lib/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    CalendarGridExComponent,
    BitsExComponent,
    SizeofExComponent,
    NoTemplatesComponent,
    PartsComponent,
    SingleTemplateComponent,
    SingleTemplatePerLevelComponent,
    TemplatePerRowComponent,
    TemplatePerParentComponent,
    DirectivesExComponent
  ],
  imports: [
    BrowserModule,
    NgbDatepickerModule,
    BitsModule,
    CalendarGridModule,
    DirectivesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
