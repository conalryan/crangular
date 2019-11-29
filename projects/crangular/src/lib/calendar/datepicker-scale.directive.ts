import { AfterViewChecked, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: 'ngb-datepicker[scale]'
})
export class DatepickerScaleDirective implements AfterViewChecked {

  @Input() scale: number;
  @Input() monthsPerRow: number;

  constructor(
    private readonly _ngbDatepicker: NgbDatepicker,
    private readonly _elementRef: ElementRef, 
    private readonly _renderer: Renderer2) {
  }

  ngAfterViewChecked(): void {
    const size = 2 * (this.scale ? this.scale : 1); // default is 2 rems set by ng-bootstrap
    const width = size * 7; // 7 days per week
    const ngbDatepickerEl = this._elementRef.nativeElement;
     
    // Must maintain single parent for all months ref: https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/datepicker/datepicker.ts#L126
    const ngbDpMonthsEl = ngbDatepickerEl.childNodes[2];
    this._renderer.addClass(ngbDpMonthsEl, 'row');
    
    // Loop through months
    const colSize = 12 / (this.monthsPerRow || 1); // 12 column bootstrap grid
    const ngbDpMonthElLen = ngbDpMonthsEl.childNodes.length;
    for (let i = 0; i < ngbDpMonthElLen; i++) {
      const ngbDpMonthEl = ngbDpMonthsEl.childNodes[i];
      if (ngbDpMonthEl.nodeName === '#comment') {
        // Alternative is to start index at 1 and skip this check. We could add a test to ensure childNodes[0] is always a comment.
        continue;
      }
      this._renderer.addClass(ngbDpMonthEl, `col-${colSize}`);
      
      // Month view
      // [1] when navigation === 'select', [2] when navigation === 'none'
      const ngbDatepickerMonthViewIndex = this._ngbDatepicker.navigation === 'none' ? 2 : 1;
      const ngbDatepickerMonthViewEl: HTMLElement = ngbDpMonthEl.childNodes[ngbDatepickerMonthViewIndex];
      this._renderer.setStyle(ngbDatepickerMonthViewEl, 'width', `${width}rem`);
      this._renderer.addClass(ngbDatepickerMonthViewEl, 'ml-auto');
      this._renderer.addClass(ngbDatepickerMonthViewEl, 'mr-auto');

      // Loop through weeks
      const ngbDpWeekElLen = ngbDatepickerMonthViewEl.childNodes.length;
      for (let j = 0; j < ngbDpWeekElLen; j++) {
        const ngbDpWeekEl = ngbDatepickerMonthViewEl.childNodes[j];
        if (ngbDpWeekEl.nodeName === '#comment') {
          // Same comment, run time check or test that will fail on breaking change?
          continue;
        }
        
        // Loop through days
        const ngbDpWeekDayLen = ngbDpWeekEl.childNodes.length;
        for (let k = 0; k < ngbDpWeekDayLen; k++) {
          const ngbDpWeekDay = ngbDpWeekEl.childNodes[k];
          if (ngbDpWeekDay.nodeName === '#comment') {
            // Run time check or test that will fail on breaking change?
            continue;
          }
          // default is 2 rems set by ng-bootstrap
          let size = 2 * (this.scale ? this.scale : 1);
          this._renderer.setStyle(ngbDpWeekDay, 'height', `${size}rem`);
          this._renderer.setStyle(ngbDpWeekDay, 'width', `${size}rem`);
        }
      }
    }
  }
}
