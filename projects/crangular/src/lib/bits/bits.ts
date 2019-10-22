import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';




@Component({
  selector: 'cr-bits',
  template: `
    <p>
      bits works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BitsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
