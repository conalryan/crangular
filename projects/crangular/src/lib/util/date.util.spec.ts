import { DateChangeType, DateIncrementField, DateRange, DateUtil } from './date.util';

describe('DateUtil', () => {
  it('can convert a date to a given day', () => {
    expect(DateUtil.getDayOfWeekString(DateUtil.isoStringDateToDate('2019-02-11'))).toEqual('Monday');
    expect(DateUtil.getDayOfWeekString(DateUtil.isoStringDateToDate('2019-12-11'))).toEqual('Wednesday');
  });

  it('can format a date object to YYYY-mm-dd', () => {
    expect(DateUtil.dateToYYYYMMDD(DateUtil.isoStringDateToDate('2019-02-11'))).toEqual('2019-02-11');
    expect(DateUtil.dateToYYYYMMDD(DateUtil.isoStringDateToDate('2100-01-01'))).toEqual('2100-01-01');
  });

  it('Checks if a date range contains another range', () => {
    const rangeLeft: DateRange = {
      start: '2018-05-06',
      end: '2018-05-10'
    };
    const rangeRight: DateRange = {
      start: '2018-05-06',
      end: '2018-05-10'
    };
    expect(DateUtil.doesDateRangeContains(rangeLeft, rangeRight)).toBe(true);

    rangeRight.end = '2018-05-11';
    expect(DateUtil.doesDateRangeContains(rangeLeft, rangeRight)).toBe(false);

    rangeRight.end = '2018-05-10';
    expect(DateUtil.doesDateRangeContains(rangeLeft, rangeRight)).toBe(true);

    rangeRight.start = '2018-05-05';
    expect(DateUtil.doesDateRangeContains(rangeLeft, rangeRight)).toBe(false);
  });
  describe('Calculation functions - adding/subtracting days', () => {
    describe('numberOfDays function', () => {
      it('should return null', () => {
        const d = new Date(2017, 12, 1);
        expect(DateUtil.numberOfDays(null, null)).toEqual(null);
        expect(DateUtil.numberOfDays(d, null)).toEqual(null);
        expect(DateUtil.numberOfDays(null, d)).toEqual(null);
        expect(DateUtil.numberOfDays(undefined, undefined)).toEqual(null);
        expect(DateUtil.numberOfDays(d, undefined)).toEqual(null);
        expect(DateUtil.numberOfDays(undefined, d)).toEqual(null);
      });

      it('should return valid number of days', () => {
        const d = new Date(2017, 0, 1); // jan
        expect(DateUtil.numberOfDays(d, d)).toEqual(0);
        let start = new Date(2017, 9, 31); // oct
        let end = new Date(2017, 10, 1); // nov
        let range = DateUtil.numberOfDays(start, end);
        expect(range).toEqual(1);
        start = new Date(2016, 11, 25); // oct
        end = new Date(2017, 0, 4); // nov
        range = DateUtil.numberOfDays(start, end);
        expect(range).toEqual(10);
      });
    });

    describe('numberOfNgbDays function', () => {
      it('should return null', () => {
        const d = { year: 2017, month: 12, day: 1 };
        expect(DateUtil.numberOfNgbDays(null, null)).toEqual(null);
        expect(DateUtil.numberOfNgbDays(d, null)).toEqual(null);
        expect(DateUtil.numberOfNgbDays(null, d)).toEqual(null);
        expect(DateUtil.numberOfNgbDays(undefined, undefined)).toEqual(null);
        expect(DateUtil.numberOfNgbDays(d, undefined)).toEqual(null);
        expect(DateUtil.numberOfNgbDays(undefined, d)).toEqual(null);
      });

      it('should return valid number of days', () => {
        let start = { year: 2017, month: 11, day: 20 };
        let end = { year: 2017, month: 11, day: 21 };
        expect(DateUtil.numberOfNgbDays(start, end)).toEqual(1);
        start = { year: 2017, month: 11, day: 24 };
        end = { year: 2017, month: 11, day: 28 };
        expect(DateUtil.numberOfNgbDays(start, end)).toEqual(4);
        start = { year: 2017, month: 11, day: 20 };
        end = { year: 2017, month: 12, day: 2 };
        expect(DateUtil.numberOfNgbDays(start, end)).toEqual(12);
        start = { year: 2017, month: 12, day: 30 };
        end = { year: 2018, month: 1, day: 8 };
        expect(DateUtil.numberOfNgbDays(start, end)).toEqual(9);
      });
    });

    describe('addDays function', () => {
      it('should return null', () => {
        const d = { year: 2017, month: 12, day: 1 };
        expect(DateUtil.addDays(null, null)).toEqual(null);
        expect(DateUtil.addDays(d, null)).toEqual(null);
        expect(DateUtil.addDays(null, 0)).toEqual(null);
        expect(DateUtil.addDays(undefined, undefined)).toEqual(null);
        expect(DateUtil.addDays(d, undefined)).toEqual(null);
        expect(DateUtil.addDays(undefined, 0)).toEqual(null);
      });

      it('should add correct number of days', () => {
        let d = { year: 2017, month: 12, day: 1 };
        expect(DateUtil.addDays(d, 1)).toEqual({
          year: 2017,
          month: 12,
          day: 2
        });
        expect(DateUtil.addDays(d, 15)).toEqual({
          year: 2017,
          month: 12,
          day: 16
        });
        d = { year: 2017, month: 11, day: 27 };
        expect(DateUtil.addDays(d, 10)).toEqual({
          year: 2017,
          month: 12,
          day: 7
        });
        d = { year: 2017, month: 12, day: 25 };
        expect(DateUtil.addDays(d, 8)).toEqual({
          year: 2018,
          month: 1,
          day: 2
        });
      });

      it('should account for daylight savings time', () => {
        // Daylight savings start 11Mar2018
        // Daylight savings end 04Nov2018
        const beforeDaylightSavings = { year: 2018, month: 3, day: 10 };
        expect(DateUtil.addDays(beforeDaylightSavings, 1)).toEqual({
          year: 2018,
          month: 3,
          day: 11
        });
        expect(DateUtil.addDays(beforeDaylightSavings, 2)).toEqual({
          year: 2018,
          month: 3,
          day: 12
        });

        const afterDaylightSavings = { year: 2018, month: 11, day: 4 };
      });
    });

    describe('subtractDays function', () => {
      it('should return null', () => {
        const d = { year: 2017, month: 12, day: 1 };
        expect(DateUtil.subtractDays(null, null)).toEqual(null);
        expect(DateUtil.subtractDays(d, null)).toEqual(null);
        expect(DateUtil.subtractDays(null, 0)).toEqual(null);
        expect(DateUtil.subtractDays(undefined, undefined)).toEqual(null);
        expect(DateUtil.subtractDays(d, undefined)).toEqual(null);
        expect(DateUtil.subtractDays(undefined, 0)).toEqual(null);
      });

      it('should subtract correct number of days', () => {
        let d = { year: 2017, month: 11, day: 20 };
        expect(DateUtil.subtractDays(d, 1)).toEqual({
          year: 2017,
          month: 11,
          day: 19
        });
        expect(DateUtil.subtractDays(d, 15)).toEqual({
          year: 2017,
          month: 11,
          day: 5
        });
        d = { year: 2017, month: 12, day: 10 };
        expect(DateUtil.subtractDays(d, 12)).toEqual({
          year: 2017,
          month: 11,
          day: 28
        });
        d = { year: 2018, month: 1, day: 5 };
        expect(DateUtil.subtractDays(d, 8)).toEqual({
          year: 2017,
          month: 12,
          day: 28
        });
      });

      it('should account for daylight savings time', () => {
        // Daylight savings start 11Mar2018
        // Daylight savings end 04Nov2018
        const afterDaylightSavings = { year: 2018, month: 3, day: 13 };
        expect(DateUtil.subtractDays(afterDaylightSavings, 2)).toEqual({
          year: 2018,
          month: 3,
          day: 11
        });
        expect(DateUtil.subtractDays(afterDaylightSavings, 3)).toEqual({
          year: 2018,
          month: 3,
          day: 10
        });
      });
    });

    describe('yesterday', () => {
      it('should return correct yesterday value', () => {
        const today = new Date();
        const yesterday = new Date(today.getTime() - DateUtil.MILLISECONDS_IN_DAY);
        const twoDaysAgo = new Date(today.getTime() - 2 * DateUtil.MILLISECONDS_IN_DAY);
        expect(DateUtil.yesterday()).toEqual({
          year: yesterday.getFullYear(),
          month: yesterday.getMonth() + 1,
          day: yesterday.getDate()
        });
        expect(DateUtil.yesterday()).not.toEqual({
          year: twoDaysAgo.getFullYear(),
          month: twoDaysAgo.getMonth() + 1,
          day: twoDaysAgo.getDate()
        });
      });
    });

    describe('incrementUntilPresent', () => {
      it('should return the input', () => {
        expect(DateUtil.incrementUntilPresent(null, null)).toEqual(null);
        expect(DateUtil.incrementUntilPresent(null, DateIncrementField.DAY)).toEqual(null);
        expect(DateUtil.incrementUntilPresent(null, DateIncrementField.MONTH)).toEqual(null);
        expect(DateUtil.incrementUntilPresent(null, DateIncrementField.YEAR)).toEqual(null);
        expect(DateUtil.incrementUntilPresent(undefined, null)).toEqual(undefined);
        const today = new Date();
        expect(DateUtil.incrementUntilPresent(today, null)).toEqual(today);
        expect(DateUtil.incrementUntilPresent(today, undefined)).toEqual(today);
      });

      it('should increment the day', () => {
        // without passing 'minDate'
        let today = new Date();
        let yesterday = new Date(today.getTime() - DateUtil.MILLISECONDS_IN_DAY);
        expect(DateUtil.incrementUntilPresent(yesterday, DateIncrementField.DAY)).toEqual(today);
        // middle of month
        yesterday = new Date(2017, 10, 21);
        today = new Date(2017, 10, 22);
        expect(DateUtil.incrementUntilPresent(yesterday, DateIncrementField.DAY, today)).toEqual(today);
        // overlap month
        yesterday = new Date(2017, 9, 31);
        today = new Date(2017, 10, 1);
        expect(DateUtil.incrementUntilPresent(yesterday, DateIncrementField.DAY, today)).toEqual(today);
        // overlap year
        yesterday = new Date(2017, 11, 31);
        today = new Date(2018, 0, 1);
        expect(DateUtil.incrementUntilPresent(yesterday, DateIncrementField.DAY, today)).toEqual(today);
      });

      it('should increment the month', () => {
        // past month, past day
        let pastMonth = new Date(2017, 9, 21);
        let today = new Date(2017, 10, 22);
        let nextMonth = new Date(2017, 11, 21);
        expect(DateUtil.incrementUntilPresent(pastMonth, DateIncrementField.MONTH, today)).toEqual(nextMonth);
        // past month, same day
        pastMonth = new Date(2017, 9, 22);
        today = new Date(2017, 10, 22);
        nextMonth = new Date(2017, 10, 22);
        expect(DateUtil.incrementUntilPresent(pastMonth, DateIncrementField.MONTH, today)).toEqual(nextMonth);
        // past month, future day
        pastMonth = new Date(2017, 9, 25);
        today = new Date(2017, 10, 22);
        nextMonth = new Date(2017, 10, 25);
        expect(DateUtil.incrementUntilPresent(pastMonth, DateIncrementField.MONTH, today)).toEqual(nextMonth);
        // past month where the next month does not have 31 days, defaults to the first of the following month
        pastMonth = new Date(2017, 7, 31); // Aug 31st
        today = new Date(2017, 10, 1); // Nov 1st
        nextMonth = new Date(2017, 10, 1); // Nov 1st. Util bumps month to Sep 31st, which Date() transforms to Oct 1st.
        expect(DateUtil.incrementUntilPresent(pastMonth, DateIncrementField.MONTH, today)).toEqual(nextMonth);
        // past month where the next month does not have 31 days, defaults to the first of the following month
        pastMonth = new Date(2017, 7, 31); // Aug 31st
        today = new Date(2017, 8, 2); // Sep 2nd
        nextMonth = new Date(2017, 9, 1); // Oct 1st
        expect(DateUtil.incrementUntilPresent(pastMonth, DateIncrementField.MONTH, today)).toEqual(nextMonth);
        // overlap year
        pastMonth = new Date(2017, 11, 31);
        today = new Date(2018, 0, 1);
        nextMonth = new Date(2018, 0, 31);
        expect(DateUtil.incrementUntilPresent(pastMonth, DateIncrementField.MONTH, today)).toEqual(nextMonth);
      });

      it('should increment the year', () => {
        // past year, same month, past day
        let pastYear = new Date(2016, 10, 20);
        let today = new Date(2017, 10, 21);
        let nextYear = new Date(2018, 10, 20);
        expect(DateUtil.incrementUntilPresent(pastYear, DateIncrementField.YEAR, today)).toEqual(nextYear);
        // past year, same month, same day
        pastYear = new Date(2016, 10, 21);
        today = new Date(2017, 10, 21);
        nextYear = new Date(2017, 10, 21);
        expect(DateUtil.incrementUntilPresent(pastYear, DateIncrementField.YEAR, today)).toEqual(nextYear);
        // past year, same month, future day
        pastYear = new Date(2016, 10, 25);
        today = new Date(2017, 10, 21);
        nextYear = new Date(2017, 10, 25);
        expect(DateUtil.incrementUntilPresent(pastYear, DateIncrementField.YEAR, today)).toEqual(nextYear);
        // past year, past month, past day
        pastYear = new Date(2016, 9, 19);
        today = new Date(2017, 10, 20);
        nextYear = new Date(2018, 9, 19);
        expect(DateUtil.incrementUntilPresent(pastYear, DateIncrementField.YEAR, today)).toEqual(nextYear);
        // past year, past month, same day
        pastYear = new Date(2016, 9, 20);
        today = new Date(2017, 10, 20);
        nextYear = new Date(2018, 9, 20);
        expect(DateUtil.incrementUntilPresent(pastYear, DateIncrementField.YEAR, today)).toEqual(nextYear);
        // past year, past month, future day
        pastYear = new Date(2016, 9, 22);
        today = new Date(2017, 10, 20);
        nextYear = new Date(2018, 9, 22);
        expect(DateUtil.incrementUntilPresent(pastYear, DateIncrementField.YEAR, today)).toEqual(nextYear);
      });
    });
  });

  describe('Validation functions', () => {
    describe('isValidNgbDateStruct function', () => {
      it('should return correct response', () => {
        const valid = { year: 2017, month: 11, day: 8 };
        const nullYear = { year: null, month: 11, day: 8 };
        const nullMonth = { year: 2017, month: null, day: 8 };
        const nullDay = { year: 2017, month: 11, day: null };
        expect(DateUtil.isValidNgbDateStruct(valid)).toEqual(true);
        expect(DateUtil.isValidNgbDateStruct(nullYear)).toEqual(false);
        expect(DateUtil.isValidNgbDateStruct(nullMonth)).toEqual(false);
        expect(DateUtil.isValidNgbDateStruct(nullDay)).toEqual(false);
      });
    });
    it('checks if date is in the past', () => {
      const yesterday = DateUtil.yesterday();
      expect(DateUtil.isDateInPast(yesterday)).toBe(true);
    });
  });

  describe('Transform functions', () => {
    describe('ngbDateStruct', () => {
      it('should return null', () => {
        expect(DateUtil.ngbDateStruct(null, 11, 20)).toEqual(null);
        expect(DateUtil.ngbDateStruct(2017, null, 20)).toEqual(null);
        expect(DateUtil.ngbDateStruct(2107, 11, null)).toEqual(null);
        expect(DateUtil.ngbDateStruct(undefined, 11, 20)).toEqual(null);
        expect(DateUtil.ngbDateStruct(2017, undefined, 20)).toEqual(null);
        expect(DateUtil.ngbDateStruct(2107, 11, undefined)).toEqual(null);
      });

      it('should return correct NgbDateStruct', () => {
        expect(DateUtil.ngbDateStruct(2017, 11, 20)).toEqual({
          year: 2017,
          month: 11,
          day: 20
        });
      });
    });

    describe('ngbDateStructToDate function', () => {
      it('should return null', () => {
        const nullYear = { year: null, month: 11, day: 8 };
        const nullMonth = { year: 2017, month: null, day: 8 };
        const nullDay = { year: 2017, month: 11, day: null };
        expect(DateUtil.ngbDateStructToDate(null)).toEqual(null);
        expect(DateUtil.ngbDateStructToDate(nullYear)).toEqual(null);
        expect(DateUtil.ngbDateStructToDate(nullMonth)).toEqual(null);
        expect(DateUtil.ngbDateStructToDate(nullDay)).toEqual(null);
      });

      it('should return correct Date', () => {
        const ngbD = { year: 2017, month: 6, day: 13 };
        const d = new Date(2017, 5, 13); // 5 is June - month is 0 indexed in Date
        expect(DateUtil.ngbDateStructToDate(ngbD)).toEqual(d);
      });
    });

    describe('ngbDateStructToIsoStringDate', () => {
      it('should return null', () => {
        const missingDash = '20171120';
        const missingYear = '1120';
        const missingMonth = '201720';
        const missingDay = '201711';
        expect(DateUtil.isoStringDateToNgbDateStruct(null)).toEqual(null);
        expect(DateUtil.isoStringDateToNgbDateStruct(missingDash)).toEqual(null);
        expect(DateUtil.isoStringDateToNgbDateStruct(missingYear)).toEqual(null);
        expect(DateUtil.isoStringDateToNgbDateStruct(missingMonth)).toEqual(null);
        expect(DateUtil.isoStringDateToNgbDateStruct(missingMonth)).toEqual(null);
        expect(DateUtil.isoStringDateToNgbDateStruct(missingDay)).toEqual(null);
        expect(DateUtil.isoStringDateToNgbDateStruct('no number')).toEqual(null);
      });

      it('should return valid ISO date string', () => {
        expect(
          DateUtil.ngbDateStructToIsoStringDate({
            year: 2017,
            month: 11,
            day: 20
          })
        ).toEqual('2017-11-20');
        expect(
          DateUtil.ngbDateStructToIsoStringDate({
            year: 2017,
            month: 1,
            day: 2
          })
        ).toEqual('2017-01-02');
      });
    });

    describe('dateToNgbDateStruct', () => {
      it('should return null', () => {
        expect(DateUtil.dateToNgbDateStruct(null)).toEqual(null);
        expect(DateUtil.dateToNgbDateStruct(undefined)).toEqual(null);
      });
      it('should return date', () => {
        const date = new Date(2019, 6, 17, 0, 0, 0, 0);
        expect(DateUtil.dateToNgbDateStruct(date)).toEqual({ year: 2019, month: 7, day: 17 });
      });
    });

    describe('ngbDateStructToMmYy', () => {
      it('should transform correctly', () => {
        const singleMonth = { year: 2018, month: 1, day: 22 };
        expect(DateUtil.ngbDateStructToMmYy(singleMonth)).toEqual('0118');

        const twoDigitMonth = { year: 2018, month: 10, day: 22 };
        expect(DateUtil.ngbDateStructToMmYy(twoDigitMonth)).toEqual('1018');

        const twoDigitYear = { year: 18, month: 1, day: 22 };
        expect(DateUtil.ngbDateStructToMmYy(twoDigitYear)).toEqual('0118');
      });
    });

    describe('mmYyToNgbDateStruct', () => {
      it('should transform correctly to last day of month', () => {
        expect(DateUtil.mmYyToNgbDateStruct('0118')).toEqual({ year: 2018, month: 1, day: 31 });
        expect(DateUtil.mmYyToNgbDateStruct('1018')).toEqual({ year: 2018, month: 10, day: 31 });
        expect(DateUtil.mmYyToNgbDateStruct('0220')).toEqual({ year: 2020, month: 2, day: 29 });
      });
    });

    describe('prependDigitsToYear', () => {
      it('should return null', () => {
        expect(DateUtil.prependDigitsToYear(null)).toEqual(null);
        expect(DateUtil.prependDigitsToYear(undefined)).toEqual(null);
        expect(DateUtil.prependDigitsToYear(NaN)).toEqual(null);
      });

      it('should return the year entered', () => {
        expect(DateUtil.prependDigitsToYear(2017)).toEqual(2017);
        expect(DateUtil.prependDigitsToYear(2018)).toEqual(2018);
        expect(DateUtil.prependDigitsToYear(2032)).toEqual(2032);
      });

      it('should prepend two digits to the year', () => {
        const thisYear = new Date().getFullYear().toString();
        const twoDigits = thisYear.substring(0, 2);
        expect(DateUtil.prependDigitsToYear(17)).toEqual(+(twoDigits + 17));
        expect(DateUtil.prependDigitsToYear(19)).toEqual(+(twoDigits + 19));
        expect(DateUtil.prependDigitsToYear(24)).toEqual(+(twoDigits + 24));

        // Special case for when user enters values < 10
        expect(DateUtil.prependDigitsToYear(7)).toEqual(+(twoDigits + '07'));
        expect(DateUtil.prependDigitsToYear(1)).toEqual(+(twoDigits + '01'));
      });
    });

    describe('convert JS day to a dd string', () => {
      it('should return the correct format', () => {
        expect(DateUtil.jsDayOrMonthToString(5)).toEqual('05');
        expect(DateUtil.jsDayOrMonthToString(10)).toEqual('10');
      });
    });

    describe('should handle daylight savings time', () => {
      it('daylight savings starts', () => {
        const beforeDaylightSavings = { year: 2018, month: 3, day: 10 };
        expect(DateUtil.addDays(beforeDaylightSavings, 2)).toEqual({
          year: 2018,
          month: 3,
          day: 12
        });
      });
      it('daylight savings end', () => {
        const afterDaylightSavingEnds = { year: 2018, month: 11, day: 12 };
        expect(DateUtil.subtractDays(afterDaylightSavingEnds, 10)).toEqual({
          year: 2018,
          month: 11,
          day: 2
        });
      });
    });

    describe('generate date range', () => {
      it('should generate date range from group range', () => {
        const dateRange = DateUtil.generateDateRange(DateUtil.today(), DateUtil.tomorrow());
        expect(dateRange[0]).toEqual(DateUtil.today());
        expect(dateRange[1]).toEqual(DateUtil.tomorrow());
      });

      it('should generate js date range', () => {
        const start = new Date(2019, 8, 19, 0, 0, 0, 0);
        const dateRange = DateUtil.generateJsDateRange(start, 2);
        expect(dateRange[0]).toEqual(start);
        expect(dateRange[1]).toEqual(new Date(2019, 8, 20, 0, 0, 0, 0));
      });
    });

    describe('is Weekend', () => {
      it('should be a weekend', () => {
        const sat = new Date(2019, 8, 14, 0, 0, 0, 0);
        expect(DateUtil.isWeekend(sat)).toEqual(true);

        const sun = new Date(2019, 8, 15, 0, 0, 0, 0);
        expect(DateUtil.isWeekend(sun)).toEqual(true);
      });

      it('should not be a weekend', () => {
        const mon = new Date(2019, 8, 9, 0, 0, 0, 0);
        expect(DateUtil.isWeekend(mon)).toEqual(false);

        const fri = new Date(2019, 8, 13, 0, 0, 0, 0);
        expect(DateUtil.isWeekend(fri)).toEqual(false);
      });
    });

    describe('clone date', () => {
      it('should clone the date without time', () => {
        const d = new Date(2019, 11, 15, 1, 2, 3, 4);
        const c = DateUtil.cloneDate(d, false);
        expect(d).not.toBe(c);
        // date
        expect(d.getFullYear()).toEqual(c.getFullYear());
        expect(d.getMonth()).toEqual(c.getMonth());
        expect(d.getDate()).toEqual(c.getDate());
        // time
        expect(d.getHours()).not.toEqual(c.getHours());
        expect(d.getMinutes()).not.toEqual(c.getMinutes());
        expect(d.getSeconds()).not.toEqual(c.getSeconds());
        expect(d.getMilliseconds()).not.toEqual(c.getMilliseconds());
      });

      it('should clone the date with time', () => {
        const d = new Date(2019, 11, 15, 1, 2, 3, 4);
        const c = DateUtil.cloneDate(d, true);
        expect(d).not.toBe(c);
        // date
        expect(d.getFullYear()).toEqual(c.getFullYear());
        expect(d.getMonth()).toEqual(c.getMonth());
        expect(d.getDate()).toEqual(c.getDate());
        // time
        expect(d.getHours()).toEqual(c.getHours());
        expect(d.getMinutes()).toEqual(c.getMinutes());
        expect(d.getSeconds()).toEqual(c.getSeconds());
        expect(d.getMilliseconds()).toEqual(c.getMilliseconds());
      });
    });

    describe('is Date Less than or Equal', () => {
      it('should be lessthan or Equal', () => {
        expect(DateUtil.isDateLessThanOrEqual(DateUtil.today(), DateUtil.tomorrow())).toBeTruthy();
        expect(DateUtil.isDateLessThanOrEqual(DateUtil.tomorrow(), DateUtil.today())).toBeFalsy();
        expect(DateUtil.isDateLessThanOrEqual(DateUtil.today(), DateUtil.today())).toBeTruthy();
        expect(DateUtil.isDateLessThanOrEqual({ year: null, month: null, day: null }, null)).toBeFalsy();
      });
      it('should be lessthan', () => {
        expect(DateUtil.isDateLessThan(DateUtil.today(), DateUtil.tomorrow())).toBeTruthy();
        expect(DateUtil.isDateLessThan(DateUtil.tomorrow(), DateUtil.today())).toBeFalsy();
        expect(DateUtil.isDateLessThan({ year: null, month: null, day: null }, null)).toBeFalsy();
      });
    });
    describe('validate iso string date', () => {
      it('should return false when given invalid date', () => {
        expect(DateUtil.isValidIsoDate('2019-02-31')).toBe(false);
      });
    });
  });

  it('type guard for ngbdatestruct', () => {
    expect(DateUtil.isNgbDateStruct(12)).toEqual(false);
    expect(DateUtil.isNgbDateStruct(null)).toEqual(false);
    expect(DateUtil.isNgbDateStruct(undefined)).toEqual(false);
    expect(DateUtil.isNgbDateStruct('hello')).toEqual(false);
    expect(DateUtil.isNgbDateStruct(DateUtil.ngbDateStructToDate(DateUtil.today()))).toEqual(false);
    expect(DateUtil.isNgbDateStruct(DateUtil.today())).toEqual(true);
  });

  describe('should return appropriate date change type', () => {
    const verifyDateChangeType = (oldStartDate, oldEndDate, newStartDate, newEndDate, expectedResult) => {
      expect(DateUtil.getDateChangeType(newStartDate, newEndDate, oldStartDate, oldEndDate)).toBe(expectedResult);
    };

    it('should calculate dailyRates if dates are unchanged', () => {
      const oldStartDate = { year: 2019, month: 8, day: 1 };
      const oldEndDate = { year: 2019, month: 9, day: 1 };
      const newStartDate = { year: 2019, month: 8, day: 1 };
      const newEndDate = { year: 2019, month: 9, day: 1 };
      verifyDateChangeType(oldStartDate, oldEndDate, newStartDate, newEndDate, DateChangeType.UNCHANGED);
    });

    it('should calculate dailyRates if dates expand', () => {
      const oldStartDate = { year: 2019, month: 8, day: 1 };
      const oldEndDate = { year: 2019, month: 9, day: 1 };
      const newStartDate = { year: 2019, month: 7, day: 28 };
      const newEndDate = { year: 2019, month: 9, day: 15 };
      verifyDateChangeType(oldStartDate, oldEndDate, newStartDate, newEndDate, DateChangeType.EXPANDED);
    });

    it('should calculate dailyRates if dates shrink', () => {
      const oldStartDate = { year: 2019, month: 8, day: 1 };
      const oldEndDate = { year: 2019, month: 9, day: 1 };
      const newStartDate = { year: 2019, month: 8, day: 6 };
      const newEndDate = { year: 2019, month: 8, day: 25 };
      verifyDateChangeType(oldStartDate, oldEndDate, newStartDate, newEndDate, DateChangeType.SHRINKED);
    });

    it('should calculate dailyRates if dates overlay on the left', () => {
      const oldStartDate = { year: 2019, month: 8, day: 1 };
      const oldEndDate = { year: 2019, month: 9, day: 1 };
      const newStartDate = { year: 2019, month: 7, day: 20 };
      const newEndDate = { year: 2019, month: 8, day: 25 };
      verifyDateChangeType(oldStartDate, oldEndDate, newStartDate, newEndDate, DateChangeType.LEFT_OVERLAY);
    });

    it('should calculate dailyRates if dates overlay on the right', () => {
      const oldStartDate = { year: 2019, month: 8, day: 1 };
      const oldEndDate = { year: 2019, month: 9, day: 1 };
      const newStartDate = { year: 2019, month: 8, day: 10 };
      const newEndDate = { year: 2019, month: 9, day: 15 };
      verifyDateChangeType(oldStartDate, oldEndDate, newStartDate, newEndDate, DateChangeType.RIGHT_OVERLAY);
    });

    it('should calculate dailyRates if date ranges are disjoint', () => {
      const oldStartDate = { year: 2019, month: 8, day: 1 };
      const oldEndDate = { year: 2019, month: 9, day: 1 };
      const newStartDate = { year: 2019, month: 10, day: 1 };
      const newEndDate = { year: 2019, month: 11, day: 10 };
      verifyDateChangeType(oldStartDate, oldEndDate, newStartDate, newEndDate, DateChangeType.DISJOINT);
    });
  });

  describe('Can perform date formatting', () => {
    it('can format month to abbreviation', () => {
      const mapping = [
        {
          month: 1,
          abbr: 'JAN'
        },
        {
          month: 2,
          abbr: 'FEB'
        },
        {
          month: 3,
          abbr: 'MAR'
        },
        {
          month: 4,
          abbr: 'APR'
        },
        {
          month: 5,
          abbr: 'MAY'
        },
        {
          month: 6,
          abbr: 'JUN'
        },
        {
          month: 7,
          abbr: 'JUL'
        },
        {
          month: 8,
          abbr: 'AUG'
        },
        {
          month: 9,
          abbr: 'SEP'
        },
        {
          month: 10,
          abbr: 'OCT'
        },
        {
          month: 11,
          abbr: 'NOV'
        },
        {
          month: 12,
          abbr: 'DEC'
        }
      ];
      mapping.forEach(({ month, abbr }) => {
        expect(DateUtil.monthToAbbreviation(month)).toEqual(abbr);
      });
      expect(DateUtil.monthToAbbreviation(1211)).toEqual('');
      expect(DateUtil.monthToAbbreviation(-1)).toEqual('');
    });
  });

  describe('Dow match Date', () => {
    it('should match Sunday correctly', () => {
      let dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const d = new Date(2019, 8, 22, 0, 0, 0, 0);
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', '-', '-', '-', '-', 'S', 'S'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', '-', '-', '-', '-', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(false);
    });

    it('should match Monday correctly', () => {
      let dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const d = new Date(2019, 8, 23, 0, 0, 0, 0);
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', '-', '-', '-', '-', 'S', 'S'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['-', 'T', 'W', 'T', 'F', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(false);
    });

    it('should match Tuesday correctly', () => {
      let dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const d = new Date(2019, 8, 24, 0, 0, 0, 0);
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', 'T', '-', '-', '-', 'S', 'S'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['-', '-', 'W', 'T', 'F', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(false);
    });

    it('should match Wednesday correctly', () => {
      let dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const d = new Date(2019, 8, 25, 0, 0, 0, 0);
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', 'T', 'W', '-', '-', 'S', 'S'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['-', 'T', '-', 'T', 'F', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(false);
    });

    it('should match Thursday correctly', () => {
      let dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const d = new Date(2019, 8, 26, 0, 0, 0, 0);
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', 'T', '-', 'T', '-', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['-', 'T', '-', '-', 'F', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(false);
    });

    it('should match Friday correctly', () => {
      let dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const d = new Date(2019, 8, 27, 0, 0, 0, 0);
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', 'T', '-', 'T', 'F', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['-', 'T', '-', '-', '-', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(false);
    });

    it('should match Saturday correctly', () => {
      let dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const d = new Date(2019, 8, 28, 0, 0, 0, 0);
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['M', 'T', '-', 'T', 'F', 'S', '-'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(true);

      dow = ['-', 'T', 'W', '-', 'F', '-', 'S'];
      expect(DateUtil.dowMatchDate(dow, d)).toEqual(false);
    });
  });

  describe('DOW index references', () => {
    it('should return Sunday from index = 0', () => {
      expect(DateUtil.getDayOfWeekFromIndex(0)).toBe('Sunday');
    });

    it('should return Monday from index = 1', () => {
      expect(DateUtil.getDayOfWeekFromIndex(1)).toBe('Monday');
    });

    it('should return Saturday from index = 6', () => {
      expect(DateUtil.getDayOfWeekFromIndex(6)).toBe('Saturday');
    });

    it('should return Sunday from index = 7', () => {
      expect(DateUtil.getDayOfWeekFromIndex(7)).toBe('Sunday');
    });

    it('should return 0 from Sunday', () => {
      expect(DateUtil.getDayOfWeekIndex('Sunday')).toBe(0);
    });

    it('should return 1 from Sunday', () => {
      expect(DateUtil.getDayOfWeekIndex('Monday')).toBe(1);
    });

    it('should return 6 from Sunday', () => {
      expect(DateUtil.getDayOfWeekIndex('Saturday')).toBe(6);
    });

    it('should return Sun from Sunday', () => {
      expect(DateUtil.DayToAbbreviation('Sunday')).toBe('Sun');
    });

    it('should return Mon from Monday', () => {
      expect(DateUtil.DayToAbbreviation('Monday')).toBe('Mon');
    });

    it('should return Tue from Tuesday', () => {
      expect(DateUtil.DayToAbbreviation('Tuesday')).toBe('Tue');
    });

    it('should return Wed from Wednesday', () => {
      expect(DateUtil.DayToAbbreviation('Wednesday')).toBe('Wed');
    });

    it('should return Thurs from Thursday', () => {
      expect(DateUtil.DayToAbbreviation('Thursday')).toBe('Thur');
    });

    it('should return Fri from Friday', () => {
      expect(DateUtil.DayToAbbreviation('Friday')).toBe('Fri');
    });

    it('should return Sat from Saturday', () => {
      expect(DateUtil.DayToAbbreviation('Saturday')).toBe('Sat');
    });

  });
});
