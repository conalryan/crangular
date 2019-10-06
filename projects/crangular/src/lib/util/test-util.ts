import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Key } from '../model/key';

export class TestUtil {
  static chainCode = 'HCC';
  // rate
  static ratePlanCode = 'RTFLX';
  static ratePlanName = 'Flex Rate';
  // property
  static propertyCode = 'PIAWQ';
  static propertyName = 'Premier Inn Dublin Airport';
  static brandName = 'Premier Inn';
  static phoneNumber = '353 1 895 7777';
  static address1 = 'Airside Retail Park';
  static countryName = 'IRELAND';
  static cityName = 'Dublin';
  static postalCode = '01730';
  static distance = 4.1;
  static currency = 'EUR';
  // product
  static productCode = 'KNGN';

  private constructor() {
    // prevent instantiation
  }

  /**
   * Strips the white space from the string
   *
   * @param {string} value
   * @returns {string}
   */
  public static stripWhiteSpace(value: string): string {
    return value
      .replace(/^\s+|\s+$/g, '') // beginning and end
      .replace(/\r?\n|\r/g, '') // new lines
      .replace(/\t|\s+|\s+/g, ' '); // tabs and multiple spaces
  }
}

/**
 * @ref https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/common.ts#L6
 * @param html
 * @param type
 */
export function createGenericTestComponent<T>(html: string, type: { new (...args: any[]): T }): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

/**
 * @ref https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/common.ts#L66
 * @param key
 * @param options
 */
export function createKeyEvent(key: Key, options: { type: 'keyup' | 'keydown' } = { type: 'keyup' }) {
  const event = document.createEvent('KeyboardEvent') as any;
  const initEvent = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
  initEvent(options.type, true, true, window, 0, 0, 0, 0, 0, key);
  Object.defineProperties(event, { which: { get: () => key } });

  return event;
}
