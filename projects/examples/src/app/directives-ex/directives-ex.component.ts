import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cr-directives-ex',
  template: `
    <p style="color:blue;">Sanity style</p>

    <p style="color:blue;" class="red-color pr-2">
      Sanity test color
    </p>

    <p crAttributeElementRef style="color:blue;" class="red-color">
      attribute element ref directive works!
    </p>

    <p crAttributeHostBinding class="red-color">
      attribute host binding directive works!
    </p>

    <p crAttributeRenderer class="red-color">
      attribute renderer directive works!
    </p>

    <p [crAttribute]="'hi'" class="red-color">
      attribute directive works!
    </p>

    <p *crStructural>
      structural directives works!
    </p>

    <cr-element>inside element</cr-element>
  `,
  styles: [`
    .red-color {
      color: red; // add !important; to override even style attribute
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectivesExComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
