import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[crAttributeRenderer]' })
export class AttributeRendererDirective {

  constructor(private readonly _elementRef: ElementRef,
              private readonly _renderer: Renderer2) {
    console.warn(this._elementRef);
    this._renderer.addClass(this._elementRef.nativeElement, 'border');
    this._renderer.addClass(this._elementRef.nativeElement, 'text-muted');
   }
}
