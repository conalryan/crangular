import { Directive, ElementRef, TemplateRef, Input, OnInit, HostBinding, Renderer2 } from '@angular/core';

@Directive({ selector: '[crAttribute]' })
export class AttributeDirective implements OnInit {

  @HostBinding('class.border') border = true; // this._elementRef.nativeElement.className === "border"
  // @HostBinding('class.text-muted') muted = true; // this._elementRef.nativeElement.className === "border text-muted"
  // Or combine the two lines above
  // @HostBinding('class') muted = 'border text-muted';

  @Input() crAttribute: string;

  constructor(private readonly _elementRef: ElementRef,
              private readonly _renderer: Renderer2) {
    console.warn(this._elementRef);
    // const clientClasses = this._elementRef.nativeElement.className;
    // Append clientClasses to HostBindings.
    // this._elementRef.nativeElement.className = clientClasses;
    // this._renderer.addClass(this._elementRef.nativeElement, 'border');
   }

   ngOnInit() {
     console.log(this.crAttribute);
   }
}
