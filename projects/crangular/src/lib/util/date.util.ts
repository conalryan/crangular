import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * This will give various overlay types when the dates changed
 * @file DateChangeOverlayType
 * 1. DISJOINT:                                  4. EXPANDED
 *  |------|   |-------|                            |-------------|
 *  old dates    new dates                             new dates
 *           or                                         |-----|
 *  |------|   |-------|                                old dates
 * new dates     old dates
 *
 * 2. LEFT_OVERLAY                                5. SHRINKED
 *    new dates                                       |---------------|
 *   |-------|                                            old dates
 *       |--------|                                        |------|
 *         old dates                                        new dates
 * 3. RIGHT_OVERLAY
 *         new dates
 *        |-------|
 * |--------|
 * old dates
 */
export enum DateChangeType {
  'DISJOINT',
  'LEFT_OVERLAY',
  'RIGHT_OVERLAY',
  'EXPANDED',
  'SHRINKED',
  'UNCHANGED'
}

export enum DateIncrementField {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

export interface DateRange {
  start: string;
  end: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export class DateUtil {
  static HOURS_IN_DAY = 24;
  static MINUTES_IN_HOUR = 60;
  static SECONDS_IN_MINUTE = 60;
  static MILLISECONDS_IN_SECOND = 1000;
  static MILLISECONDS_IN_DAY =
    DateUtil.HOURS_IN_DAY * DateUtil.MINUTES_IN_HOUR * DateUtil.SECONDS_IN_MINUTE * DateUtil.MILLISECONDS_IN_SECOND;

  private constructor() {
    // prevent instantiation
  }

  // =============================== Calcs ===============================
  /**
   * Calculate the number of days between two Dates
   *
   */
  public static numberOfDays(start: Date, end: Date): number {
    if (start && end) {
      return Math.round((end.getTime() - start.getTime()) / DateUtil.MILLISECONDS_IN_DAY);
    }
    return null;
  }

  public static isDateLessThanOrEqual(start: NgbDateStruct, end: NgbDateStruct): boolean {
    if (DateUtil.isValidNgbDateStruct(start) && DateUtil.isValidNgbDateStruct(end)) {
      return DateUtil.numberOfDays(DateUtil.ngbDateStructToDate(start), DateUtil.ngbDateStructToDate(end)) >= 0;
    }
    return false;
  }

  public static isDateLessThan(start: NgbDateStruct, end: NgbDateStruct): boolean {
    if (DateUtil.isValidNgbDateStruct(start) && DateUtil.isValidNgbDateStruct(end)) {
      return DateUtil.numberOfDays(DateUtil.ngbDateStructToDate(start), DateUtil.ngbDateStructToDate(end)) > 0;
    }
    return false;
  }

  public static isDateGreaterThan(start: NgbDateStruct, end: NgbDateStruct): boolean {
    return !DateUtil.isDateLessThan(start, end);
  }

  /**
   * Calculate the number of days between two NgbDateStruct
   *
   */
  public static numberOfNgbDays(start: NgbDateStruct, end: NgbDateStruct): number {
    if (DateUtil.isValidNgbDateStruct(start) && DateUtil.isValidNgbDateStruct(end)) {
      return DateUtil.numberOfDays(DateUtil.ngbDateStructToDate(start), DateUtil.ngbDateStructToDate(end));
    }
    return null;
  }

  /**
   * Add a number of days to the NgbDateStruct
   *
   */
  public static addDays(ngbDate: NgbDateStruct, days: number): NgbDateStruct {
    if (DateUtil.isValidNgbDateStruct(ngbDate) && days != null) {
      const d = DateUtil.ngbDateStructToDate(ngbDate);
      // Switching to this from the millisecond offset as that
      // approach might fail around the start/end of daylight saving time.
      // The first day of daylight saving time is only 23 hours long,
      // and the last is 25 hours long.
      d.setDate(d.getDate() + days);
      return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
    }
    return null;
  }

  /**
   * Subract a number of days from the NgbDateStruct
   *
   */
  public static subtractDays(ngbDate: NgbDateStruct, days: number): NgbDateStruct {
    if (DateUtil.isValidNgbDateStruct(ngbDate) && days) {
      const d = DateUtil.ngbDateStructToDate(ngbDate);
      // Switching to this from the millisecond offset as that
      // approach might fail around the start/end of daylight saving time.
      // The first day of daylight saving time is only 23 hours long,
      // and the last is 25 hours long.
      d.setDate(d.getDate() - days);
      return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
    }
    return null;
  }

  /**
   * Compare 2 NgbDateStructs and determine if they are equal year, month, day
   *
   */
  public static areDatesEqual(date: NgbDateStruct, compDate: NgbDateStruct): boolean {
    return date && compDate && date.year === compDate.year && date.month === compDate.month && date.day === compDate.day;
  }

  public static areJsDatesEqual(date: Date, compDate: Date): boolean {
    return (
      date &&
      compDate &&
      date.getFullYear() === compDate.getFullYear() &&
      date.getMonth() === compDate.getMonth() &&
      date.getDate() === compDate.getDate()
    );
  }

  /**
   * Return today's date - 1 day as an NgbDateStruct
   *
   */
  public static yesterday(): NgbDateStruct {
    return DateUtil.subtractDays(DateUtil.today(), 1);
  }

  /**
   * Returns today's date as an NgbDateStruct
   *
   */
  public static today(): NgbDateStruct {
    const today = DateUtil.dateAsUTC(new Date());
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  public static isDateInPast(date: NgbDateStruct): boolean {
    const today = DateUtil.dateAsUTC(new Date());
    /**
     * Setting the hours to 0 so both `today` and `compareTo` are
     * set to 0:00:00 for the comparison.
     */
    today.setHours(0, 0, 0, 0);
    const compareTo = DateUtil.ngbDateStructToDate(date);
    return compareTo < today;
  }

  /**
   * Return today's date + 1 day as an NgbDateStruct
   *
   */
  public static tomorrow(): NgbDateStruct {
    return DateUtil.addDays(DateUtil.today(), 1);
  }

  /**
   * Increment the date if it's in the past.
   * Select the incrementField you want to bump
   * e.g.:
   *  increment 'DAY' will increment one day at a time until the date is at least equal to today.
   *  increment 'MONTH' will increment the month until the date is at least equal to today.
   *
   * Caveats:
   *  - If the date is the 31st and this function increments the month to the next month that does NOT have 31 days,
   *    JS Date() will return the first of the following month (i.e. new Date(2017, 8, 31); // Sep 31st returns Oct
   * 1st).
   *
   */
  public static incrementUntilPresent(date: Date, incrementField: DateIncrementField, minDate?: Date): Date {
    if (date && incrementField) {
      let dateMilli = date.getTime();
      minDate = minDate ? minDate : new Date();
      const todayMilli = minDate.getTime();
      if (dateMilli < todayMilli && todayMilli - dateMilli >= DateUtil.MILLISECONDS_IN_DAY) {
        switch (incrementField) {
          case DateIncrementField.DAY:
            dateMilli += DateUtil.MILLISECONDS_IN_DAY;
            date = DateUtil.incrementUntilPresent(new Date(dateMilli), DateIncrementField.DAY, minDate);
            break;
          case DateIncrementField.MONTH:
            // JS Date will bump to next year if date.getMonth() goes to next year (i.e. new Date(2017, 12, 1); => Jan
            // 01 2018
            date = DateUtil.incrementUntilPresent(
              new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
              DateIncrementField.MONTH,
              minDate
            );
            break;
          case DateIncrementField.YEAR:
            date = DateUtil.incrementUntilPresent(
              new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()),
              DateIncrementField.YEAR,
              minDate
            );
            break;
        }
      }
    }
    return date;
  }

  // ======================== Validation =======================
  /**
   * Validate NgbDateStruct has a year, month and day property defined
   *
   */
  public static isValidNgbDateStruct(ngbDate: NgbDateStruct): boolean {
    return !!(ngbDate && ngbDate.year && ngbDate.month && ngbDate.day);
  }

  // ======================== Transform =======================
  /**
   * Transform year, month, day numbers into a NgbDateStruct
   *
   */
  public static ngbDateStruct(year: number, month: number, day: number) {
    if (year && month && day) {
      return { year, month, day };
    }
    return null;
  }

  /**
   * Transform NgbDateStruct to Date.
   * JS Date() uses 0 indexed months, however, NgbDateStruct is set to use 1 indexed months (i.e. Jan === 1, not 0).
   *
   */
  public static ngbDateStructToDate(ngbDate: NgbDateStruct): Date {
    if (DateUtil.isValidNgbDateStruct(ngbDate)) {
      return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day, 0, 0, 0, 0);
    }
    return null;
  }

  /**
   * Transform NgbDateStruct to Date.
   * JS Date() uses 0 indexed months, however, NgbDateStruct is set to use 1 indexed months (i.e. Jan === 1, not 0).
   *
   */
  public static ngbDateStructToIsoStringDate(ngbDate: NgbDateStruct): string {
    const year = DateUtil.prependDigitsToYear(ngbDate.year);
    const month = ngbDate.month < 10 ? '0' + ngbDate.month : ngbDate.month;
    const day = ngbDate.day < 10 ? '0' + ngbDate.day : ngbDate.day;
    return year + '-' + month + '-' + day;
  }

  /**
   * Transform NgbDateStruct to MMYY
   *
   */
  public static ngbDateStructToMmYy(ngbDate: NgbDateStruct): string {
    const year = DateUtil.prependDigitsToYear(ngbDate.year)
      .toString()
      .substring(2);
    const month = ngbDate.month < 10 ? '0' + ngbDate.month : ngbDate.month;
    return `${month}${year}`;
  }

  /**
   * We need to initialize ngbDateStruct with last day of the month as credit cards usually expire on
   * last day of the month. (we use this function to convert credit card expiry to a ngbDateStruct).
   * Even for a general use when we specify a month and year we mean it should be valid throughout the month.
   */
  public static mmYyToNgbDateStruct(mmYy: string): NgbDateStruct {
    const maxDatesOfInputMmYy = new Date(+mmYy.substring(2), +mmYy.substring(0, 2), 0).getDate();
    return {
      year: DateUtil.prependDigitsToYear(+mmYy.substring(2)),
      month: +mmYy.substring(0, 2),
      day: maxDatesOfInputMmYy
    } as NgbDateStruct;
  }

  /**
   * Transform ISO date string in the format 'yyyy-mm-dd' to NgbDateStruct
   *
   */
  public static isoStringDateToNgbDateStruct(date: string): NgbDateStruct {
    if (date) {
      const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = date.match(regex);
      if (match) {
        return { year: +match[1], month: +match[2], day: +match[3] };
      }
    }
    return null;
  }

  /**
   * Transform ISO date string in the format 'yyyy-mm-dd' to Date
   *
   */
  public static isoStringDateToDate(date: string): Date {
    if (date) {
      const regex = /^(\d{4})-(\d{2})-(\d{2})*/;
      const match = date.match(regex);
      if (match) {
        return new Date(+match[1], +match[2] - 1, +match[3], 0, 0, 0, 0);
      }
    }
    return null;
  }

  /**
   * Transform Date to NgbDateStruct
   *
   */
  public static dateToNgbDateStruct(date: Date): NgbDateStruct {
    if (date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    }
    return null;
  }

  /**
   * Transforms a javascript Date object to
   * YYYY-MM-DD string representation.
   */
  public static dateToYYYYMMDD(date: Date): string {
    return DateUtil.ngbDateStructToIsoStringDate(DateUtil.dateToNgbDateStruct(date));
  }

  /**
   * Check for full year (yyyy) versus last 2-digits (yy) versus last digit (y) (i.e. 2017 vs 17 vs 7).
   * If user only entered 2 digits, add the first two digits from the current year.
   * If user only entered a single digit, add the first two digits form the current year to ('0' + digit)
   *
   */
  public static prependDigitsToYear(year: number): number {
    if (year) {
      let thisYear = new Date().getFullYear().toString();
      if (year < 10) {
        /**
         * Can't use substring (0,3) here. This branch
         * is triggered when a user entered years like 05, etc
         * If using substring(0,3) we were returning 05 -> 2015
         * which is wrong.
         */
        thisYear = thisYear.substring(0, 2);
        return +(thisYear + `0${year}`);
      } else if (year < 100) {
        thisYear = thisYear.substring(0, 2);
        return +(thisYear + year);
      }
      return year;
    }
    return null;
  }

  /**
   * Convert a number day or month into a string day or month in the format dd or mm.
   * e.g. 5 -> '05', 10 -> '10'
   *
   */
  public static jsDayOrMonthToString(dayOrMonth: number): string {
    let numAsString = dayOrMonth.toString();
    numAsString = numAsString.length === 2 ? numAsString : '0' + numAsString;
    return numAsString;
  }

  /**
   * Create date as UTC date.
   *
   */
  public static dateAsUTC(date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }

  /**
   * create a date range from a start Date to end Date
   */
  public static generateDateRange(startDate: NgbDateStruct, endDate: NgbDateStruct): NgbDateStruct[] {
    const dateRange: NgbDateStruct[] = [];
    for (let date = startDate; DateUtil.isDateLessThanOrEqual(date, endDate); date = DateUtil.addDays(date, 1)) {
      dateRange.push(date);
    }
    return dateRange;
  }

  /**
   * Create a date range from a given Date and number of days
   * e.g. (2019-09-19, 2) -> [2019-09-19, 2019-09-20]
   */
  public static generateJsDateRange(startDate: Date, numDays: number): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < numDays; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0);
      if (i > 0) {
        date.setDate(date.getDate() + i);
      }
      dates.push(date);
    }
    return dates;
  }

  /**
   * Determine if a given date is on Saturday or Sunday
   * Sunday = 0
   * Monday = 1
   * ...
   * Saturday = 6
   */
  public static isWeekend(date: Date): boolean {
    return date && (date.getDay() === 0 || date.getDay() === 6);
  }

  public static cloneDate(date: Date, includeTime = false): Date {
    if (includeTime) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  public static doesDateRangeContains(left: DateRange, right: DateRange) {
    const startLeft = DateUtil.isoStringDateToNgbDateStruct(left.start);
    const endLeft = DateUtil.isoStringDateToNgbDateStruct(left.end);
    const startRight = DateUtil.isoStringDateToNgbDateStruct(right.start);
    const endRight = DateUtil.isoStringDateToNgbDateStruct(right.end);
    return DateUtil.isDateLessThanOrEqual(startLeft, startRight) && DateUtil.isDateLessThanOrEqual(endRight, endLeft);
  }

  /**
   * Returns boolean based on the validity of the date string. Optionally tests the regex
   * if passed along with the date.
   */
  public static isValidIsoDate(date: string, regexp?: RegExp): boolean {
    const tokens = date.split('-');
    const y = +tokens[0];
    const m = +tokens[1] - 1; // by default index of month starts from 0, so decrement by one
    const d = +tokens[2];
    const constructedDate: Date = new Date(y, m, d);
    // when given 2019-02-31 as date => javascript converts to 2019-03-02.
    // but this function will treat it as invalid value and return false as the month
    // differs with the newly constructed date month (Feb <=> Mar).
    return constructedDate && constructedDate.getMonth() === m && (regexp ? !!date.trim().match(regexp) : true);
  }

  /**
   * Custom type guard for {NgbDateStruct}
   */
  public static isNgbDateStruct(d: any): d is NgbDateStruct {
    return !!d && typeof d === 'object' && 'year' in d && 'month' in d && 'day' in d;
  }

  /**
   * get the date change type between two date ranges
   * More Documentation of DateChangeType can be found at {@see DateChangeType}
   */
  public static getDateChangeType(
    newStartDate: NgbDateStruct,
    newEndDate: NgbDateStruct,
    oldStartDate: NgbDateStruct,
    oldEndDate: NgbDateStruct
  ): DateChangeType {
    const startDatesDiff = DateUtil.numberOfNgbDays(newStartDate, oldStartDate);
    const endDatesDiff = DateUtil.numberOfNgbDays(newEndDate, oldEndDate);
    if (startDatesDiff === 0 && endDatesDiff === 0) {
      return DateChangeType.UNCHANGED;
    } else if (startDatesDiff >= 0 && endDatesDiff <= 0) {
      return DateChangeType.EXPANDED;
    } else if (startDatesDiff <= 0 && endDatesDiff >= 0) {
      return DateChangeType.SHRINKED;
    } else if (startDatesDiff > 0 && endDatesDiff > 0 && DateUtil.numberOfNgbDays(newEndDate, oldStartDate) < 0) {
      return DateChangeType.LEFT_OVERLAY;
    } else if (startDatesDiff < 0 && endDatesDiff < 0 && DateUtil.numberOfNgbDays(oldEndDate, newStartDate) < 0) {
      return DateChangeType.RIGHT_OVERLAY;
    }
    return DateChangeType.DISJOINT;
  }

  public static ngbDateToDDMONYYYY(input: NgbDateStruct): string {
    const dd = input.day.toString(10);
    const mon = DateUtil.monthToAbbreviation(input.month);
    const yyyy = input.year.toString(10);
    return dd + mon + yyyy;
  }

  public static monthToAbbreviation(input: number): string {
    switch (input) {
      case 1:
        return 'JAN';
      case 2:
        return 'FEB';
      case 3:
        return 'MAR';
      case 4:
        return 'APR';
      case 5:
        return 'MAY';
      case 6:
        return 'JUN';
      case 7:
        return 'JUL';
      case 8:
        return 'AUG';
      case 9:
        return 'SEP';
      case 10:
        return 'OCT';
      case 11:
        return 'NOV';
      case 12:
        return 'DEC';
      default:
        return '';
    }
  }

  /**
   * OBE will return dow string for days the object/rule applies to:
   *
   * e.g. 'MTWTFSS' for all days of weeks.
   *
   * A dash is present for any missing day.
   * e.g. 'M--TF-S' for Monday, Thursday, Friday, Sunday
   *
   * Date.getDay() will return day of week locale time where Sunday == 0 and Saturday == 6
   *
   */
  public static dowMatchDate(dow: string[], date: Date): boolean {
    let dowMatch = false;
    const day = date.getDay();
    switch (day) {
      case 0:
        dowMatch = dow[6] === 'S';
        break;
      case 1:
        dowMatch = dow[0] === 'M';
        break;
      case 2:
        dowMatch = dow[1] === 'T';
        break;
      case 3:
        dowMatch = dow[2] === 'W';
        break;
      case 4:
        dowMatch = dow[3] === 'T';
        break;
      case 5:
        dowMatch = dow[4] === 'F';
        break;
      case 6:
        dowMatch = dow[5] === 'S';
        break;
    }
    return dowMatch;
  }

  /**
   * Get a string representation of the day of the week from a given date object
   */
  public static getDayOfWeekString(d: Date): DayOfWeek {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    const weekdays: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[d.getDay()];
  }

  /**
   * Get a string representation of the day of the week from a given day index, starting at 0, for Sunday
   */
  public static getDayOfWeekFromIndex(i: number): DayOfWeek {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    const weekdays: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[i % 7];
  }

  /**
   * Get a index for the day of the week provided, starting at 0 for Sunday. If the provided string is not a DOW, return -1
   */
  public static getDayOfWeekIndex(day: string): number {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return weekdays.indexOf(day.toUpperCase());
  }

  /**
   * Get a the standard abbreviation for the day of week provided (Tue, Wed, Thurs, etc.) if the provided string is not a day, that same string wil lbe returned
   */
  public static DayToAbbreviation(day: string): string {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    switch (day.toUpperCase()) {
      case 'SUNDAY': return 'Sun';
      case 'MONDAY': return 'Mon';
      case 'TUESDAY': return 'Tue';
      case 'WEDNESDAY': return 'Wed';
      case 'THURSDAY': return 'Thur';
      case 'FRIDAY': return 'Fri';
      case 'SATURDAY': return 'Sat';
      default: return day;
    }
  }


}
