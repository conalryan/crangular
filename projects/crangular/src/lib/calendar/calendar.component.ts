import { AfterContentChecked, ChangeDetectionStrategy, Component, ContentChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'cr-calendar',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    cr-calendar ngb-datepicker {
      border: none;
    }
    .cr-calendar {
      border: none;
    }
    .cr-calendar .bg-light {
      background-color: inherit !important;
    }
    .cr-calendar .ngb-dp-weekdays {
      border-bottom: none;
      border-radius: 0;
    }
    .cr-calendar .ngb-dp-weekday {
      color: inherit;
      font-style: normal;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements AfterContentChecked {

  @ContentChild(NgbDatepicker) ngbDatepicker: NgbDatepicker;

  constructor(
    private readonly _elementRef: ElementRef, 
    private readonly _renderer: Renderer2
  ) { }

  ngAfterContentChecked(): void {
    const ngbDatepickerEl = this._elementRef.nativeElement.childNodes[0];
    // Remove background-color, color, italics.
    this._renderer.addClass(ngbDatepickerEl, 'cr-calendar');
  }
}

