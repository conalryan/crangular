import { Directive, ElementRef, TemplateRef, Input, OnInit, HostBinding } from '@angular/core';

@Directive({ selector: 'cr-element]' })
export class ElementDirective implements OnInit {

  constructor(private readonly _elementRef: ElementRef) {
    console.warn(this._elementRef);
    /*
    ElementRef {nativeElement: cr-element}
    nativeElement: cr-element
    __proto__: Object
    */
   }

   ngOnInit() {
     // console.log(this.crAttribute);
   }
}
