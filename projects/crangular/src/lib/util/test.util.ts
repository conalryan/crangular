import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Key } from './key';

/**
 * Strips the white space from the string
 */
export function stripWhiteSpace(value: string): string {
  return value
    .replace(/^\s+|\s+$/g, '') // beginning and end
    .replace(/\r?\n|\r/g, '') // new lines
    .replace(/\t|\s+|\s+/g, ' '); // tabs and multiple spaces
};

/**
 * @ref https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/common.ts#L6
 */
export function createGenericTestComponent<T>(html: string, type: { new (...args: any[]): T }): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

/**
 * @ref https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/common.ts#L66
 */
export function createKeyEvent(key: Key, options: { type: 'keyup' | 'keydown' } = { type: 'keyup' }) {
  const event = document.createEvent('KeyboardEvent') as any;
  const initEvent = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
  initEvent(options.type, true, true, window, 0, 0, 0, 0, 0, key);
  Object.defineProperties(event, { which: { get: () => key } });

  return event;
}

export function triggerEvent(element: DebugElement | HTMLElement, eventName: string) {
  const evt = document.createEvent('Event');
  evt.initEvent(eventName, true, false);
  (element instanceof DebugElement ? element.nativeElement : element).dispatchEvent(evt);
}