# Calendar Grid

[according](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/accordion/accordion.ts#L75)
--------------------------------------------------------------------------------------------------
348 lines

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

### `ngb-accordion`
- Component the wraps directives.
- Uses `@ContentChildren(NgbPanel) panels: QueryList<NgbPanel>;` to get all the panels.
- Four inputs that can be configured via a `NgbAccordionConfig` passed via constructor.
- Uses `ng-template`
```typescript
<ng-template [ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
             [ngTemplateOutletContext]="{$implicit: panel, opened: panel.isOpen}">
</ng-template>
```

### `ngb-panel`
- Simple directive that wraps header, title, and content.
- Uses 
  ```typescript
  @ContentChildren(NgbPanelTitle, {descendants: false}) titleTpls: QueryList<NgbPanelTitle>;
  @ContentChildren(NgbPanelHeader, {descendants: false}) headerTpls: QueryList<NgbPanelHeader>;
  @ContentChildren(NgbPanelContent, {descendants: false}) contentTpls: QueryList<NgbPanelContent>;
  ```

### `ngb-heaer` `ngb-title` `ngb-content`
- Directives that expose `TemplateRef` (`ng-template[ngbPanelHeader]` ... `constructor(public templateRef: TemplateRef<any>) {}`)

[carousel](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/carousel/carousel.ts)
--------------------------------------------------------------------------------------------------
280 lines

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
- Component that wraps directives.
- Uses `@ContentChildren(NgbSlide) slides: QueryList<NgbSlide>;`
- Uses `<ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>` 

### [`ngbSlide`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/carousel/carousel.ts#L32)
- Directives that expose `TemplateRef` (`ng-template[ngbSlide])`.

[`ngb-dropdown`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/dropdown/dropdown.ts)
--------------------------------------------------------------------------------------------------
429 lines

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

[modal](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal.ts)
--------------------------------------------------------------------------------------------------

### [`NgbModal`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal.ts#L14)

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

- Service user injects into component and calls `open()`.
- It injects `modalStack` internally, and pushes all work to it.
```typescript
open(content: any, options: NgbModalOptions = {}): NgbModalRef {
  const combinedOptions = Object.assign({}, this._config, options);
  return this._modalStack.open(this._componentFactoryResolver, this._injector, content, combinedOptions);
}
```

### [`NgbModalStack`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal-stack.ts#L23)
- Service is used by `modal` service.
- aka the brain

### [`ngb-modal-window`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/modal/modal-window.ts#L18)
- Component
- Uses `ng-content`
- Accepts `@Input() windowClass: string;` and applies it to the host.

[pagination](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/pagination/pagination.ts)
--------------------------------------------------------------------------------------------------

```html
<ngb-pagination [collectionSize]="70" [(page)]="page" aria-label="Custom pagination">
  <ng-template ngbPaginationPrevious>Prev</ng-template>
  <ng-template ngbPaginationNext>Next</ng-template>
  <ng-template ngbPaginationNumber let-p>{{ getPageSymbol(p) }}</ng-template>
</ngb-pagination>
```

### [`ngb-pagination`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/pagination/pagination.ts#L118)
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

[popover](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.ts)
--------------------------------------------------------------------------------------------------
293 lines

```html
<ng-template #popTitle>Title</ng-template>
<ng-template #popContent>Content</ng-template>
<button [ngbPopover]="popContent" [popoverTitle]="popTitle">
  I've got markup and bindings in my popover!
</button>
```

### [`[ngbPopover]`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.ts#L63)
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
```

### [`NgbPopoverWindow`](https://github.com/ng-bootstrap/ng-bootstrap/blob/4.2.2/src/popover/popover.ts#L50)
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
