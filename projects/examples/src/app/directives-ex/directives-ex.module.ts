import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesExRoutingModule } from './directives-ex-routing.module';
import { DirectivesExComponent } from './directives-ex.component';
import { DirectivesModule } from 'projects/study/src/lib/directives';

@NgModule({
  declarations: [DirectivesExComponent],
  exports: [DirectivesExComponent],
  imports: [
    CommonModule,
    DirectivesExRoutingModule,
    DirectivesModule
  ]
})
export class DirectivesExModule { }
