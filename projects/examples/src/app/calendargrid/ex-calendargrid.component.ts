import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'excr-calendargrid',
  template: `
    <p>
      calendargrid works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExCalendargridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
