import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[crAttributeElementRef]' })
export class AttributeElementRefDirective {

  constructor(private readonly _elementRef: ElementRef) {
    console.warn(this._elementRef);
    const clientClasses = this._elementRef.nativeElement.className;
    // setting className will override any classes passed by client
    // Apply default classes then append clientClasses to HostBindings.
    this._elementRef.nativeElement.className = `border text-muted ${clientClasses}`;
    this._elementRef.nativeElement.style.backgroundColor = '#d2d2d2';
   }
}
