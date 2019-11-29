import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributeElementRefDirective } from './attribute-element-ref.directive';
import { AttributeHostBindingDirective } from './attribute-host-binding.directive';
import { AttributeRendererDirective } from './attribute-renderer.directive';
import { AttributeDirective } from './attribute.directive';
import { ElementDirective } from './element.directive';
import { StructuralDirective } from './structural.directive';

@NgModule({
  declarations: [AttributeDirective, AttributeElementRefDirective, AttributeHostBindingDirective, AttributeRendererDirective, ElementDirective, StructuralDirective],
  imports: [
    CommonModule
  ],
  exports: [AttributeDirective, AttributeElementRefDirective, AttributeHostBindingDirective, AttributeRendererDirective, ElementDirective, StructuralDirective]
})
export class DirectivesModule { }
