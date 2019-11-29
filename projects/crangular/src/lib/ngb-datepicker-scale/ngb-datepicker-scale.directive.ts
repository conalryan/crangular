import { AfterViewChecked, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: 'ngb-datepicker[crNgbDatepickerScale]'
})
export class NgbDatepickerScaleDirective implements AfterViewChecked {

  @Input() crNgbDatepickerScale: number;
  @Input() monthsPerRoom: number;

  constructor(
    private readonly _ngbDatepicker: NgbDatepicker,
    private readonly _elementRef: ElementRef, 
    private readonly _renderer: Renderer2) {
  }

  ngAfterViewChecked(): void {
    console.log(this._ngbDatepicker);
    console.log(this._elementRef);
    
    // ngb-datepicker {
    //   border: 1px solid #dfdfdf;
    //   border-radius: .25rem;
    //   display: inline-block;
    // }
    const ngbDatepickerEl = this._elementRef.nativeElement;
    
    // this._renderer.removeClass(ngbDatepickerEl, 'border'); // doesn't work, need host binding?
    // this._renderer.removeClass(ngbDatepickerEl, 'border-radius');
    
    const ngbDpHeaderEl = ngbDatepickerEl.childNodes[1];
    this._renderer.removeClass(ngbDpHeaderEl, 'bg-light');
    
    // Loop through months
    const ngbDpMonthsEl = ngbDatepickerEl.childNodes[2];
    const ngbDpMonthElLen = ngbDpMonthsEl.childNodes.length;
    for (let i = 0; i < ngbDpMonthElLen; i++) {
      const ngbDpMonthEl = ngbDpMonthsEl.childNodes[i];
      if (ngbDpMonthEl.nodeName === '#comment') {
        continue;
      }
      this._renderer.removeClass(ngbDpMonthEl.childNodes[1], 'bg-light');
      
      // Loop through weeks
      const ngbDatepickerMonthViewEl: HTMLElement = ngbDpMonthEl.childNodes[2];
      const ngbDpWeekElLen = ngbDatepickerMonthViewEl.childNodes.length;
      for (let j = 0; j < ngbDpWeekElLen; j++) {
        const ngbDpWeekEl = ngbDatepickerMonthViewEl.childNodes[j];
        if (ngbDpWeekEl.nodeName === '#comment') {
          continue;
        }
        this._renderer.removeClass(ngbDpWeekEl, 'bg-light');

        // Loop through days
        const ngbDpWeekDayLen = ngbDpWeekEl.childNodes.length;
        for (let k = 0; k < ngbDpWeekDayLen; k++) {
          const ngbDpWeekDay = ngbDpWeekEl.childNodes[k];
          if (ngbDpWeekDay.nodeName === '#comment') {
            continue;
          }
          this._renderer.removeClass(ngbDpWeekEl, 'font-style');
          this._renderer.setStyle(ngbDpWeekDay, 'color', '#333333');
          // default is 2 rems set by ng-bootstrap
          let size = 2 * (this.crNgbDatepickerScale ? this.crNgbDatepickerScale : 1);
          this._renderer.setStyle(ngbDpWeekDay, 'height', `${size}rem`);
          this._renderer.setStyle(ngbDpWeekDay, 'width', `${size}rem`);
        }
      }
    }
    
    
    if (this._ngbDatepicker.navigation === 'none') {
      
    }
  }
}
