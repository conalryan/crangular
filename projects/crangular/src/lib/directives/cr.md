# Directives

## [Attribute](https://angular.io/guide/attribute-directives)

```typescript
@Directive({ selector: '[crAttribute]' })
export class AttributeDirective {
  constructor(private readonly _elmRef: ElementRef) {
    console.warn(this._elmRef);  // ElementRef {nativeElement: p} nativeElement: p __proto__: Object
   }
}
```

Use:
```html
<p [crAttribute]>
  directives-ex works!
</p>
```
Uncaught Error: Template parse errors:
Can't bind to 'crAttribute' since it isn't a known property of 'p'. ("
    <p [ERROR ->][crAttribute]>
      directives-ex works!
    </p>
")

Remove bracket in template [crAttribute] -> crAttribute
```html
<p crAttribute>
  directives-ex works!
</p>
```

Or use bracket notation to pass inputs to directive

```typescript
@Directive({ selector: '[crAttribute]' })
export class AttributeDirective implements OnInit {
  @Input() crAttribute: string;
  constructor(private readonly _elementRef: ElementRef) {
    console.warn(this._elementRef);  // ElementRef {nativeElement: p} nativeElement: p __proto__: Object
   }
   ngOnInit() {
     console.log(this.crAttribute);
   }
}
```

```html
<p [crAttribute]="'hi'">
  directives-ex works!
</p>
```

### Class bindings

#### HostBinding
```typescript
@HostBinding('class.some-class) apply = true;
```
HostBindings are cummulative e.g.
```typescript
@HostBinding('class.border) border = true;
@HostBinding('class.text-muted) muted = true;
// class="border text-muted" nativeElement.className: "text-muted border"
```
Note: Classes added by the client to the host element will be overridden by `@HostBinding`
i.e. `class="red-color"` will be overridden by text-muted since they both apply color and text-muted will be applied with !important in the final DOM.
```html
<p crAttributeHostBinding class="red-color">
  attribute host bindingdirective works!
</p>
```
You can place !important on red-color as well in order to override the default.

#### ElementRef
```typescript
constructor(private readonly _elementRef: ElementRef) {
  this._elementRef.nativeElement.className = 'some-class';
}
```
className is the result that will be applied to the DOM therefore
```typescript
constructor(private readonly _elementRef: ElementRef) {
  this._elementRef.nativeElement.className = 'border';
  this._elementRef.nativeElement.className = 'text-muted';
  // class="text-muted" nativeElement.className: "text-muted"
}
```

Work around is to use elementRef to capture classes passed by client
```typescript
constructor(private readonly _elementRef: ElementRef) {
  const clientClasses = this._elementRef.nativeElement.className;
  // Append clientClasses to HostBindings.
  this._elementRef.nativeElement.className = clientClasses;
}
```

#### [Renderer](https://angular.io/api/core/Renderer2)


## [Structural](https://angular.io/guide/structural-directives)

```typescript
@Directive({ selector: '[crStructural]' })
export class StructuralDirective implements OnInit {
  constructor(private readonly _elementRef: ElementRef,
              private readonly _templateRef: TemplateRef<any>,
              private readonly _viewContainerRef: ViewContainerRef) {
    console.warn(this._elementRef);
    /*
    ElementRef {nativeElement: comment} 
    nativeElement: comment 
    __proto__: Object
    */
    console.warn(this._templateRef);
    /*
    TemplateRef_ {_parentView: {…}, _def: {…}}
    elementRef: (...)
    _def: {nodeIndex: 3, parent: null, renderParent: null, bindingIndex: 1, outputIndex: 0, …}
    _parentView: {def: {…}, parent: {…}, viewContainerParent: null, parentNodeDef: {…}, context: DirectivesExComponent, …}
    __proto__: TemplateRef
    */
    console.warn(this._viewContainerRef);
    /*
    ViewContainerRef_ {_view: {…}, _elDef: {…}, _data: {…}, _embeddedViews: Array(0)}
    element: (...)
    injector: (...)
    length: (...)
    parentInjector: (...)
    _data: {renderElement: comment, componentView: undefined, viewContainer: ViewContainerRef_, template: TemplateRef_}
    _elDef: {nodeIndex: 3, parent: null, renderParent: null, bindingIndex: 1, outputIndex: 0, …}
    _embeddedViews: []
    _view: {def: {…}, parent: {…}, viewContainerParent: null, parentNodeDef: {…}, context: DirectivesExComponent, …}
    __proto__: Object
    */

    // To revove a view
    this._viewContainerRef.clear();
    
    // To create a view
    this._viewContainerRef.createEmbeddedView(this._templateRef);
   }
}
```

```html
<p *crStructural>
  structural directives works!
</p>
```

## Add 
