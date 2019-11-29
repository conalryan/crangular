import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[crAttributeHostBinding]' })
export class AttributeHostBindingDirective {

  @HostBinding('class.border') border = true;
  @HostBinding('class.text-muted') muted = true;
  // Or combine the two lines above
  // @HostBinding('class') muted = 'border text-muted';

  constructor() { }
}
