import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerScaleDirective } from './ngb-datepicker-scale.directive';

@NgModule({
  declarations: [NgbDatepickerScaleDirective],
  exports: [NgbDatepickerScaleDirective],
  imports: [
    CommonModule,
    NgbDatepickerModule
  ]
})
export class NgbDatepickerScaleModule { }
