import { Directive, ElementRef, TemplateRef, Input, OnInit, ViewContainerRef } from '@angular/core';

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

    // To create a view
    this._viewContainerRef.createEmbeddedView(this._templateRef);

    // To revove a view
    this._viewContainerRef.clear();
   }

   ngOnInit() {
     // console.log(this.crAttribute);
   }
}
