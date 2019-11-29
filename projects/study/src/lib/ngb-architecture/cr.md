# ng-bootstrap architecture

[according](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/accordion/accordion.ts#L75)
--------------------------------------------------------------------------------------------------
348 lines
Use:
```html
<ngb-accordion #acc="ngbAccordion" activeIds="ngb-panel-0">
  <ngb-panel>
    <ng-template ngbPanelHeader let-opened="opened">
      Custom header
      <button ngbPanelToggle class="btn btn-link">Toggle</button>
    </ng-template>
    <ng-template ngbPanelTitle>
      Hi there
    </ng-template>
    <ng-template ngbPanelContent>
      blah blah
    </ng-template>
  </ngb-panel>
</ngb-accordion>
```

### [`ngb-accordion`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/accordion/accordion.ts#L180)
- Public
- Component
- Uses `@ContentChildren(NgbPanel) panels: QueryList<NgbPanel>;` to get all the panels (ngb-panel directives).
- Uses `ng-template`
```typescript
<ng-template [ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
             [ngTemplateOutletContext]="{$implicit: panel, opened: panel.isOpen}">
</ng-template>
```
- The brain
```typescript
constructor(config: NgbAccordionConfig) {
  // Some of the inputs that can be configured via a `NgbAccordionConfig` passed via constructor.
  this.type = config.type; // input
  this.closeOtherPanels = config.closeOthers; // input
}
```

### [`ngb-panel`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/accordion/accordion.ts#L102)
- Public
- Directive
- Wraps header, title, and content directives.
- Uses 
  ```typescript
  @ContentChildren(NgbPanelTitle, {descendants: false}) titleTpls: QueryList<NgbPanelTitle>;
  @ContentChildren(NgbPanelHeader, {descendants: false}) headerTpls: QueryList<NgbPanelHeader>;
  @ContentChildren(NgbPanelContent, {descendants: false}) contentTpls: QueryList<NgbPanelContent>;
  ```

### [`ngb-header` `ngb-title` `ngb-content`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/accordion/accordion.ts#L75)
- Public
- Directives 
- Expose `TemplateRef` (`ng-template[ngbPanelHeader]` ... `constructor(public templateRef: TemplateRef<any>) {}`)


[carousel](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/carousel/carousel.ts)
--------------------------------------------------------------------------------------------------
280 lines
Use:
```html
<ngb-carousel>
  <ng-template ngbSlide>
    image here
  </ng-template>
  <ng-template ngbSlide>
    content here
  </ng-template>
</ngb-carousel>
```

### [`ngb-carousel`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/carousel/carousel.ts#L49)
- Public
- Component
- Wraps directives.
- Uses `@ContentChildren(NgbSlide) slides: QueryList<NgbSlide>;`
- Uses `<ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>` 
- The brain
```typescript
constructor(
      config: NgbCarouselConfig, 
      @Inject(PLATFORM_ID) private _platformId, 
      private _ngZone: NgZone,
      private _cd: ChangeDetectorRef) {
    this.interval = config.interval;
    this.wrap = config.wrap;
    this.keyboard = config.keyboard;
    this.pauseOnHover = config.pauseOnHover;
    this.showNavigationArrows = config.showNavigationArrows;
    this.showNavigationIndicators = config.showNavigationIndicators;
  }
```

### [`ngbSlide`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/carousel/carousel.ts#L32)
- Public
- Directive
- Exposes `TemplateRef` (`ng-template[ngbSlide])`.


['datepicker'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/datepicker/datepicker.ts#L70)
--------------------------------------------------------------------------------------------------

### Module
```typescript
@NgModule({
  declarations: [
    NgbDatepicker, 
    NgbInputDatepicker,
    // Private
    // nav
    NgbDatepickerNavigation, 
    NgbDatepickerNavigationSelect,
    // views
    NgbDatepickerMonthView, 
    NgbDatepickerDayView
  ],
  exports: [NgbDatepicker, NgbInputDatepicker],
  imports: [CommonModule, FormsModule],
  entryComponents: [NgbDatepicker]
})
export class NgbDatepickerModule { }
```

### DOM result
```html
<ngb-datepicker>
  <div class="ngb-dp-header bg-light">
    <ngb-datepicker-navigation>
      <div class="ngb-dp-arrow"></div>
      <ngb-datepicker-navigation-select></ngb-datepicker-navigation-select>
      <div class="ngb-dp-arrow"></div>
    </ngb-datepicker-navigation>
  </div>

  <div class="ngb-dp-months">
    <div class="ngb-dp-month">
      <ngb-datepicker-month-view>
        <div class="ngb-dp-week ngb-dp-weekdays bg-light">
          <div class="ngb-dp-weekday small">example data: Mo</div>
        </div>
        <div class="ngb-dp-week" role="row">
          <div class="ngb-dp-day" role="gridcell">
            <div ngbdatepickerdayview>example data: 4</div>
          </div>
        </div>
      </ngb-datepicker-month-view>  
    </div>
  </div>
</ngb-datepicker>
```

### Styles
```scss
ngb-datepicker {
    border: 1px solid #dfdfdf;
    border-radius: .25rem;
    display: inline-block;
}
.ngb-dp-months {
    display: -ms-flexbox;
    display: flex;
}
ngb-datepicker-month-view {
    display: block;
}
.ngb-dp-week {
    border-radius: .25rem;
    display: -ms-flexbox;
    display: flex;
}
// Days cells are hardcoded 32 X 32
.ngb-dp-day, .ngb-dp-week-number, .ngb-dp-weekday {
  width: 2rem;
  height: 2rem;
}
```

Note: Bootstrap `row` class:
```scss
.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}
```

### Models
```typescript
export declare type DayViewModel = {
    date: NgbDate;
    context: DayTemplateContext;
    tabindex: number;
    ariaLabel: string;
    hidden: boolean;
};
export declare type WeekViewModel = {
    number: number;
    days: DayViewModel[];
    collapsed: boolean;
};
export declare type MonthViewModel = {
    firstDate: NgbDate;
    lastDate: NgbDate;
    number: number;
    year: number;
    weeks: WeekViewModel[];
    weekdays: number[];
};
```

### ['ngb-datepicker'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/datepicker/datepicker.ts#L70)
- Public
- Entry Component
- Uses `providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService, NgbDatepickerKeyMapService]`

```typescript
constructor(
      private _keyMapService: NgbDatepickerKeyMapService, public _service: NgbDatepickerService,
      private _calendar: NgbCalendar, public i18n: NgbDatepickerI18n, config: NgbDatepickerConfig,
      private _cd: ChangeDetectorRef, private _elementRef: ElementRef<HTMLElement>,
      private _ngbDateAdapter: NgbDateAdapter<any>, private _ngZone: NgZone) {
    ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
     'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
        .forEach(input => this[input] = config[input]);

    _service.select$.pipe(takeUntil(this._destroyed$)).subscribe(date => { this.select.emit(date); });

    _service.model$.pipe(takeUntil(this._destroyed$)).subscribe(model => {
      const newDate = model.firstDate;
      const oldDate = this.model ? this.model.firstDate : null;

      let navigationPrevented = false;
      // emitting navigation event if the first month changes
      if (!newDate.equals(oldDate)) {
        this.navigate.emit({
          current: oldDate ? {year: oldDate.year, month: oldDate.month} : null,
          next: {year: newDate.year, month: newDate.month},
          preventDefault: () => navigationPrevented = true
        });

        // can't prevent the very first navigation
        if (navigationPrevented && oldDate !== null) {
          this._service.open(oldDate);
          return;
        }
      }

      const newSelectedDate = model.selectedDate;
      const newFocusedDate = model.focusDate;
      const oldFocusedDate = this.model ? this.model.focusDate : null;

      this.model = model;

      // handling selection change
      if (isChangedDate(newSelectedDate, this._controlValue)) {
        this._controlValue = newSelectedDate;
        this.onTouched();
        this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
      }

      // handling focus change
      if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
        this.focus();
      }

      _cd.markForCheck();
    });
  }
```

### [Keyboard support](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/datepicker/datepicker.ts#L370)


### [NgbDatepickerKeyMapService](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/datepicker/datepicker-keymap-service.ts#L8)
- Keymap service is used up to including version 5.1.4 (latest version at time of writing)
- Master branch switches to [`NgbDatepickerKeyboardService`](https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/datepicker/datepicker.ts#L427) which injects `this` however there is no release as it is on `master` branch.
```typescript
constructor(
  private _service: NgbDatepickerService, 
  private _calendar: NgbCalendar) {
    _service.model$.subscribe(model => {
      this._minDate = model.minDate;
      this._maxDate = model.maxDate;
      this._firstViewDate = model.firstDate;
      this._lastViewDate = model.lastDate;
    });
}
```
Uses `NgbDatepickerService` for all focus moves e.g. `focus(), focusMove(), focusSelect()`)

### ['NgbDatepickerService`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/datepicker/datepicker-service.ts#L25)


### Models
```typescript
export type NgbMarkDisabled = (date: NgbDateStruct, current: {year: number, month: number}) => boolean;
export type NgbDayTemplateData = (date: NgbDateStruct, current: {year: number, month: number}) => any;

export type DayViewModel = {
  date: NgbDate,
  context: DayTemplateContext,
  tabindex: number,
  ariaLabel: string,
  hidden: boolean
};

export type WeekViewModel = {
  number: number,
  days: DayViewModel[],
  collapsed: boolean
};

export type MonthViewModel = {
  firstDate: NgbDate,
  lastDate: NgbDate,
  number: number,
  year: number,
  weeks: WeekViewModel[],
  weekdays: number[]
};

// clang-format off
export type DatepickerViewModel = {
  dayTemplateData?: NgbDayTemplateData,
  disabled: boolean,
  displayMonths: number,
  firstDate?: NgbDate,
  firstDayOfWeek: number,
  focusDate?: NgbDate,
  focusVisible: boolean,
  lastDate?: NgbDate,
  markDisabled?: NgbMarkDisabled,
  maxDate?: NgbDate,
  minDate?: NgbDate,
  months: MonthViewModel[],
  navigation: 'select' | 'arrows' | 'none',
  outsideDays: 'visible' | 'collapsed' | 'hidden',
  prevDisabled: boolean,
  nextDisabled: boolean,
  selectBoxes: {
    years: number[],
    months: number[]
  },
  selectedDate: NgbDate
};
// clang-format on

export enum NavigationEvent {
  PREV,
  NEXT
}
```

Classes to override
```scss
.bg-light {
  /* background-color: #f8f9fa !important; */
}
.ngb-dp-weekdays {
  /* border-bottom: 1px solid rgba(0,0,0,.125); */
  border-radius: 0;
}
.ngb-dp-weekday {
  /* color: #5bc0de; */
  /* color: var(--info); */
}
.ngb-dp-day, .ngb-dp-week-number, .ngb-dp-weekday {
  width: 2rem;
  height: 2rem;
}
```

[`ngb-dropdown`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/dropdown/dropdown.ts)
--------------------------------------------------------------------------------------------------
429 lines
Use:
```html
<div ngbDropdown>
  <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>Toggle dropdown</button>
  <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
    <button ngbDropdownItem>Item 1</button>
    <button ngbDropdownItem>Item 2</button>
  </div>
</div>
```

Uses all directives

### [`ngbDropdown`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/dropdown/dropdown.ts#L132)
- Public
- Directive 
- Use `@ContentChild`
```typescript
@ContentChild(NgbDropdownMenu) private _menu: NgbDropdownMenu;
@ContentChild(NgbDropdownMenu, {read: ElementRef}) private _menuElement: ElementRef;
@ContentChild(NgbDropdownAnchor) private _anchor: NgbDropdownAnchor;
```
- The brain
```typscript
constructor(
  private _changeDetector: ChangeDetectorRef, 
  config: NgbDropdownConfig, 
  @Inject(DOCUMENT) private _document: any,
  private _ngZone: NgZone, 
  private _elementRef: ElementRef<HTMLElement>, 
  private _renderer: Renderer2,
  @Optional() ngbNavbar: NgbNavbar) {
    this.placement = config.placement;
    this.container = config.container;
    this.autoClose = config.autoClose;
    this.display = ngbNavbar ? 'static' : 'dynamic';
    this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positionMenu(); });
  }
```

### [`ngbDropdownToggle`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/dropdown/dropdown.ts#L39)
- Public
- Directive
- Extends `NgbDropdownAnchor`
- Exposes `constructor(public elementRef: ElementRef<HTMLElement>) {}`

### [`ngbDropdownMenu`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/dropdown/dropdown.ts#L57)
- Public
- Directive
- Uses `@ContentChildren(NgbDropdownItem) menuItems: QueryList<NgbDropdownItem>;`


[modal](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal.ts)
--------------------------------------------------------------------------------------------------

```html
<ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title">Title here</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      Close
    </button>
  </div>
  <div class="modal-body">
    Body
  </div>
  <div class="modal-footer">
    footer
  </div>
</ng-template>
```

### [`NgbModal`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal.ts#L14)
- Public: `@Injectable({providedIn: 'root'})`
- Service
```typescript
constructor(
  private _moduleCFR: ComponentFactoryResolver, 
  private _injector: Injector, 
  private _modalStack: NgbModalStack,
  private _config: NgbModalConfig) {}
```
- Public functions:
  - `open(content: any, options: NgbModalOptions = {}): NgbModalRef`
  - `dismissAll(reason?: any) { this._modalStack.dismissAll(reason); }`
  - `hasOpenModals(): boolean { return this._modalStack.hasOpenModals(); }`

### [`NgbModalStack`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal-stack.ts#L23)
- Public: `@Injectable({providedIn: 'root'})`
- Service
- Used by `NgbModal` service.
- The brain
```typescript
constructor(
  private _applicationRef: ApplicationRef, 
  private _injector: Injector, 
  @Inject(DOCUMENT) private _document: any,
  private _scrollBar: ScrollBar, 
  private _rendererFactory: RendererFactory2) {
    // Trap focus on active WindowCmpt
    this._activeWindowCmptHasChanged.subscribe(() => {
      if (this._windowCmpts.length) {
        const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
        ngbFocusTrap(activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
        this._revertAriaHidden();
        this._setAriaHidden(activeWindowCmpt.location.nativeElement);
    }
    });
}
```
- Public functions:
  - `open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options): NgbModalRef`
  - `dismissAll(reason?: any) { this._modalRefs.forEach(ngbModalRef => ngbModalRef.dismiss(reason)); }`
  - `hasOpenModals(): boolean { return this._modalRefs.length > 0; }`

### [`NgbModalWindow`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal-window.ts#L18)
- Private: [Not exported](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal.module.ts#L13)
- Entry Component
- Uses `ng-content`
- Accepts `@Input() windowClass: string;` and applies it to the host.


[pagination](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/pagination/pagination.ts)
--------------------------------------------------------------------------------------------------
386 lines
Use:
```html
<ngb-pagination [collectionSize]="70" [(page)]="page" aria-label="Custom pagination">
  <ng-template ngbPaginationPrevious>Prev</ng-template>
  <ng-template ngbPaginationNext>Next</ng-template>
  <ng-template ngbPaginationNumber let-p>{{ getPageSymbol(p) }}</ng-template>
</ngb-pagination>
```

### [`ngb-pagination`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/pagination/pagination.ts#L118)
- Public
- Component
- Uses `@ContentChild` to get templates
```typescript
@ContentChild(NgbPaginationEllipsis) tplEllipsis: NgbPaginationEllipsis;
@ContentChild(NgbPaginationFirst) tplFirst: NgbPaginationFirst;
@ContentChild(NgbPaginationLast) tplLast: NgbPaginationLast;
@ContentChild(NgbPaginationNext) tplNext: NgbPaginationNext;
@ContentChild(NgbPaginationNumber) tplNumber: NgbPaginationNumber;
@ContentChild(NgbPaginationPrevious) tplPrevious: NgbPaginationPrevious;
```
- Uses `ng-template`
```html
<ng-template [ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
             [ngTemplateOutletContext]="{disabled: true, currentPage: page}">
</ng-template>
```
```typescript
constructor(config: NgbPaginationConfig) {
  this.disabled = config.disabled;
  this.boundaryLinks = config.boundaryLinks;
  this.directionLinks = config.directionLinks;
  this.ellipses = config.ellipses;
  this.maxSize = config.maxSize;
  this.pageSize = config.pageSize;
  this.rotate = config.rotate;
  this.size = config.size;
}
```

[popover](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.ts)
--------------------------------------------------------------------------------------------------
293 lines
Use:
```html
<ng-template #popTitle>Title</ng-template>
<ng-template #popContent>Content</ng-template>
<button [ngbPopover]="popContent" [popoverTitle]="popTitle">
  I've got markup and bindings in my popover!
</button>
```

### [`[ngbPopover]`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.ts#L63)
- Public
- Directive
```typescript
constructor(
      private _elementRef: ElementRef<HTMLElement>, 
      private _renderer: Renderer2, 
      injector: Injector,
      componentFactoryResolver: ComponentFactoryResolver, 
      viewContainerRef: ViewContainerRef, 
      config: NgbPopoverConfig,
      private _ngZone: NgZone, 
      @Inject(DOCUMENT) private _document: any, 
      private _changeDetector: ChangeDetectorRef,
      private _applicationRef: ApplicationRef) {
    // Exposed via @Input() or NgbPopoverConfig service
    this.autoClose = config.autoClose; // input
    this.placement = config.placement; // input
    this.triggers = config.triggers; // input
    this.container = config.container; // input
    this.disablePopover = config.disablePopover; // input
    this.popoverClass = config.popoverClass; // input
    this.openDelay = config.openDelay; // input
    this.closeDelay = config.closeDelay; // input
    
    this._popupService = new PopupService<NgbPopoverWindow>(
        NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, _applicationRef);

    this._zoneSubscription = _ngZone.onStable.subscribe(() => {
      if (this._windowRef) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body', 'bs-popover');
      }
    });
  }
```

### [`NgbPopoverWindow`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.ts#L50)
- Private: [It's not exported](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.module.ts#L12)
- [Entry Component](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.module.ts#L14)
- Uses `templateRef`
```html
<ng-template [ngTemplateOutlet]="isTitleTemplate() ? title : simpleTitle" 
             [ngTemplateOutletContext]="context">
</ng-template>
```
- Uses `ng-content`
```html
<ng-content></ng-content>
```

### [PopupService<T>](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/util/popup.ts#L16)
- Private: newed as private property in public `ngbPopover` directive.
- Class
- Public functions:
  - `open(content?: string | TemplateRef<any>, context?: any): ComponentRef<T>`
  - `close(): void`
```typescript
constructor(
      private _type: any, 
      private _injector: Injector, 
      private _viewContainerRef: ViewContainerRef,
      private _renderer: Renderer2, 
      private _componentFactoryResolver: ComponentFactoryResolver,
      private _applicationRef: ApplicationRef) {}
```

[progressbar](https://github.com/ng-bootstrap/ng-bootstrap/tree/4.2.2/src/progressbar)
--------------------------------------------------------------------------------------------------
77 lines
```html
<p><ngb-progressbar type="success" [value]="25">25</ngb-progressbar></p>
<p><ngb-progressbar type="info" [value]="50">Copying file <b>2 of 4</b>...</ngb-progressbar></p>
<p><ngb-progressbar type="warning" [value]="75" [striped]="true" [animated]="true"><i>50%</i></ngb-progressbar></p>
<p><ngb-progressbar type="danger" [value]="100" [striped]="true">Completed!</ngb-progressbar></p>
```

### ['ngb-progressbar'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/progressbar/progressbar.ts#L9)
- Public
- Component
- Uses `<ng-content></ng-content>`
- The brain
```typescript
constructor(config: NgbProgressbarConfig) {
  this.max = config.max;
  this.animated = config.animated;
  this.striped = config.striped;
  this.type = config.type;
  this.showValue = config.showValue;
  this.height = config.height;
}
```

[rating](https://github.com/ng-bootstrap/ng-bootstrap/tree/4.2.2/src/rating)
--------------------------------------------------------------------------------------------------
231 lines
```html
<ngb-rating [(rate)]="currentRate">
  <ng-template let-fill="fill" let-index="index">
    <span class="star" [class.filled]="fill === 100" [class.bad]="index < 3">&#9733;</span>
  </ng-template>
</ngb-rating>

<!-- form integration -->
<ngb-rating [formControl]="ctrl"></ngb-rating>
```

### ['ngb-rating'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/rating/rating.ts#L45)
- Public
- Component
- Uses
```typescript
<ng-template [ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
             [ngTemplateOutletContext]="contexts[index]">
</ng-template>
```
```typescript
@Input() starTemplate: TemplateRef<StarTemplateContext>;
@ContentChild(TemplateRef) starTemplateFromContent: TemplateRef<StarTemplateContext>;
```

[tabset](https://github.com/ng-bootstrap/ng-bootstrap/tree/4.2.2/src/tabset)
--------------------------------------------------------------------------------------------------
210 lines

```html
<ngb-tabset>
  <ngb-tab>
    <ng-template ngbTabTitle>Tab title</ng-template>
    <ng-template ngbTabContent>
      Content
    </ng-template>
  </ngb-tab>
</ngb-tabset>
```

### ['ngb-tabset'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/tabset/tabset.ts#L98)
- Public
- Component
- Uses
```html
<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></ng-template>
<ng-template [ngTemplateOutlet]="tab.contentTpl?.templateRef"></ng-template>
```
- Uses
```typescript
@ContentChildren(NgbTab) tabs: QueryList<NgbTab>;
```

### ['ngb-tab'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/tabset/tabset.ts#L38)
- Public
- Directive
- Wraps `ngbTabTitle` and `ngbTabContent`
```typescript
@ContentChildren(NgbTabTitle, {descendants: false}) titleTpls: QueryList<NgbTabTitle>;
@ContentChildren(NgbTabContent, {descendants: false}) contentTpls: QueryList<NgbTabContent>;
```

### ['ngbTabTitle'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/tabset/tabset.ts#L21)
- Public
- Directive
- Expose `TemplateRef` (`ng-template[ngbTabTitle]` ... `constructor(public templateRef: TemplateRef<any>) {}`)

### ['ngbTabContent'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/tabset/tabset.ts#L29)
- Public
- Directive
- Expose `TemplateRef` (`ng-template[ngbTabContent]` ... `constructor(public templateRef: TemplateRef<any>) {}`)

[tooltip](https://github.com/ng-bootstrap/ng-bootstrap/tree/4.2.2/src/tooltip)
--------------------------------------------------------------------------------------------------
265 lines

```html
<ng-template #tipContent>content here</ng-template>
<button type="button" class="btn btn-outline-secondary" [ngbTooltip]="tipContent">
  This button has tooltip
</button>
```

### ['ngbTooltip`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/tooltip/tooltip.ts#L50)
- Public
- Directive
```typescript
constructor(
  private _elementRef: ElementRef<HTMLElement>, 
  private _renderer: Renderer2, 
  injector: Injector,
  componentFactoryResolver: ComponentFactoryResolver, 
  viewContainerRef: ViewContainerRef, 
  config: NgbTooltipConfig,
  private _ngZone: NgZone, 
  @Inject(DOCUMENT) private _document: any, 
  private _changeDetector: ChangeDetectorRef,
  private _applicationRef: ApplicationRef) {
    this.autoClose = config.autoClose;
    this.placement = config.placement;
    this.triggers = config.triggers;
    this.container = config.container;
    this.disableTooltip = config.disableTooltip;
    this.tooltipClass = config.tooltipClass;
    this.openDelay = config.openDelay;
    this.closeDelay = config.closeDelay;
    this._popupService = new PopupService<NgbTooltipWindow>(
        NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver, _applicationRef);

    this._zoneSubscription = _ngZone.onStable.subscribe(() => {
      if (this._windowRef) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body', 'bs-tooltip');
      }
    });
}
```

### ['ngb-tooltip-window'](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/tooltip/tooltip.ts#L35)
- Private
- [Entry component](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/tooltip/tooltip.module.ts#L9)
- Uses `<ng-content></ng-content>`
- 

[typeahead](https://github.com/ng-bootstrap/ng-bootstrap/tree/4.2.2/src/typeahead)
--------------------------------------------------------------------------------------------------
414 lines + typeahead-window + highlight
Use:
```html
<ng-template #rt let-r="result" let-t="term">
  <img [src]="'https://upload.wikimedia.org/wikipedia/commons/thumb/' + r['flag']" class="mr-1" style="width: 16px">
  <ngb-highlight [result]="r.name" [term]="t"></ngb-highlight>
</ng-template>

<label for="typeahead-template">Search for a state:</label>
<input id="typeahead-template" 
       type="text" 
       class="form-control" 
       [(ngModel)]="model" 
       [ngbTypeahead]="search" 
       [resultTemplate]="rt"
       [inputFormatter]="formatter" />
```

### ['input[ngbTypeahead]`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/typeahead/typeahead.ts#L64)
- Public
- Directive
- `@Input() resultTemplate: TemplateRef<ResultTemplateContext>;`
```typescript
constructor(
  private _elementRef: ElementRef<HTMLInputElement>, 
  private _viewContainerRef: ViewContainerRef,
  private _renderer: Renderer2, 
  private _injector: Injector, 
  componentFactoryResolver: ComponentFactoryResolver,
  config: NgbTypeaheadConfig, 
  ngZone: NgZone, 
  private _live: Live, 
  @Inject(DOCUMENT) private _document: any,
  private _ngZone: NgZone, 
  private _changeDetector: ChangeDetectorRef, 
  private _applicationRef: ApplicationRef) {
    this.container = config.container;
    this.editable = config.editable;
    this.focusFirst = config.focusFirst;
    this.showHint = config.showHint;
    this.placement = config.placement;

    this._valueChanges = fromEvent<Event>(_elementRef.nativeElement, 'input')
                             .pipe(map($event => ($event.target as HTMLInputElement).value));

    this._resubscribeTypeahead = new BehaviorSubject(null);

    this._popupService = new PopupService<NgbTypeaheadWindow>(
        NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver, _applicationRef);

    this._zoneSubscription = ngZone.onStable.subscribe(() => {
      if (this.isPopupOpen()) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body');
      }
    });
  }
```


Index
==================================================================================================

ApplicationRef
--------------------------------------------------------------------------------------------------
```bash
grep -lr ApplicationRef .
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./util/popup.ts
./popover/popover.ts
./modal/modal-stack.ts
```

ChangeDetectorRef
--------------------------------------------------------------------------------------------------
```bash
grep -rl ChangeDetectorRef .
./dropdown/dropdown.ts
./timepicker/timepicker.ts
./tooltip/tooltip.ts
./rating/rating.ts
./typeahead/typeahead.ts
./buttons/checkbox.ts
./buttons/radio.ts
./datepicker/datepicker.ts
./datepicker/datepicker-input.ts
./carousel/carousel.ts
./popover/popover.ts
```

ComponentFactoryResolver
--------------------------------------------------------------------------------------------------
```bash
grep -rl ComponentFactoryResolver .
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./util/popup.ts
./datepicker/datepicker-input.ts
./popover/popover.ts
./modal/modal.ts
./modal/modal-stack.ts
```

ComponentRef
--------------------------------------------------------------------------------------------------
Used by widgets that append an element (aka window) to the DOM

```bash
grep -lr ComponentRef .
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./util/popup.ts
./datepicker/datepicker-input.ts
./popover/popover.ts
./modal/modal-ref.ts
./modal/modal-stack.ts
```

ContentRef
--------------------------------------------------------------------------------------------------
```bash
grep -rl ContentChildren .
./dropdown/dropdown.ts
./accordion/accordion.ts
./tabset/tabset.ts
./carousel/carousel.ts
```

ControlValueAccessor
--------------------------------------------------------------------------------------------------
- [input[ngbTypeahead]](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/typeahead/typeahead.ts#L82) 

```bash
grep -lr ControlValueAccessor .
./timepicker/timepicker.ts
./rating/rating.ts
./typeahead/typeahead.ts
./buttons/checkbox.ts
./buttons/radio.ts
./datepicker/datepicker.ts
./datepicker/datepicker-input.ts
```

Document
--------------------------------------------------------------------------------------------------
```bash
grep -rl @Inject\(DOCUMENT\) .
./dropdown/dropdown.ts
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./util/scrollbar.ts
./util/accessibility/live.ts
./datepicker/datepicker-input.ts
./popover/popover.ts
./modal/modal-window.ts
./modal/modal-stack.ts
```

ElementRef
--------------------------------------------------------------------------------------------------
```bash
grep -rl ElementRef .
./dropdown/dropdown.ts
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./buttons/radio.ts
./alert/alert.ts
./datepicker/datepicker.ts
./datepicker/datepicker-navigation-select.ts
./datepicker/datepicker-input.ts
./popover/popover.ts
./modal/modal-window.ts
```

EntryComponents
--------------------------------------------------------------------------------------------------
```bash
grep -lr entryComponents .
./tooltip/tooltip.module.ts
./typeahead/typeahead.module.ts
./alert/alert.module.ts
./datepicker/datepicker.module.ts
./popover/popover.module.ts
./modal/modal.module.ts
```

Injector
--------------------------------------------------------------------------------------------------
```bash
grep -rl Injector .
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./util/popup.ts
./popover/popover.ts
./modal/modal.ts
./modal/modal-config.ts
./modal/modal.spec.ts
./modal/modal-stack.ts
```

Logic
--------------------------------------------------------------------------------------------------
- [PopupService<T>](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/util/popup.ts#L16)
  Used by:
  - [input[ngbTypeahead]#constructor()](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/typeahead/typeahead.ts#L207)

ng-content
--------------------------------------------------------------------------------------------------
```bash
grep -lr ng-content .
./tooltip/tooltip.ts
./alert/alert.ts
./toast/toast.ts
./progressbar/progressbar.ts
./popover/popover.ts
./modal/modal-window.ts
```

ng-template
--------------------------------------------------------------------------------------------------
```bash
grep -lr ng-template .
./pagination/pagination.ts
./pagination/pagination.spec.ts
./timepicker/timepicker.ts
./tooltip/tooltip.spec.ts
./rating/rating.ts
./rating/rating.spec.ts
./typeahead/typeahead-window.spec.ts
./typeahead/typeahead-window.ts
./typeahead/highlight.ts
./accordion/accordion.ts
./accordion/accordion.spec.ts
./datepicker/datepicker-month-view.spec.ts
./datepicker/datepicker.ts
./datepicker/datepicker-input.spec.ts
./datepicker/datepicker.spec.ts
./datepicker/datepicker-navigation.ts
./datepicker/datepicker-month-view.ts
./toast/toast.ts
./toast/toast.spec.ts
./tabset/tabset.spec.ts
./tabset/tabset.ts
./carousel/carousel.spec.ts
./carousel/carousel.ts
./popover/popover.ts
./popover/popover.spec.ts
./modal/modal.spec.ts
```

ngTemplateOutlet
--------------------------------------------------------------------------------------------------
```bash
grep -rl ngTemplateOutlet .
./pagination/pagination.ts
./rating/rating.ts
./typeahead/typeahead-window.ts
./accordion/accordion.ts
./datepicker/datepicker.ts
./datepicker/datepicker-month-view.ts
./toast/toast.ts
./tabset/tabset.ts
./carousel/carousel.ts
./popover/popover.ts
```

NgZone
--------------------------------------------------------------------------------------------------
```bash
grep -lr NgZone .
./dropdown/dropdown.ts
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./util/focus-trap.ts
./util/autoclose.ts
./datepicker/datepicker.ts
./datepicker/datepicker-input.ts
./carousel/carousel.ts
./popover/popover.ts
./modal/modal-window.ts
./modal/modal-stack.ts
```

Renderer2
--------------------------------------------------------------------------------------------------
```bash
grep -rl Renderer2 .
./dropdown/dropdown.ts
./tooltip/tooltip.ts
./typeahead/typeahead.ts
./buttons/radio.ts
./util/popup.ts
./alert/alert.ts
./datepicker/datepicker-navigation-select.ts
./datepicker/datepicker-input.ts
./popover/popover.ts
```

TemplateRef
--------------------------------------------------------------------------------------------------
- [input[ngbTypeahead]](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/typeahead/typeahead.ts#L156)
```bash
grep -lr TemplateRef .
./pagination/pagination.ts
./tooltip/tooltip.ts
./tooltip/tooltip.spec.ts
./rating/rating.ts
./typeahead/typeahead-window.ts
./typeahead/typeahead.ts
./util/popup.ts
./accordion/accordion.ts
./datepicker/datepicker.ts
./datepicker/datepicker-config.ts
./datepicker/datepicker.spec.ts
./datepicker/datepicker-input.ts
./datepicker/datepicker-month-view.ts
./toast/toast.ts
./tabset/tabset.ts
./carousel/carousel.ts
./popover/popover.ts
./popover/popover.spec.ts
./modal/modal-ref.ts
./modal/modal.ts
./modal/modal.spec.ts
./modal/modal-stack.ts
```

ViewContainerRef
--------------------------------------------------------------------------------------------------
```bash
grep -rl ViewContainerRef .
./tooltip/tooltip.ts
./tooltip/tooltip.spec.ts
./typeahead/typeahead.ts
./util/popup.ts
./datepicker/datepicker-input.ts
./popover/popover.ts
./popover/popover.spec.ts
```
