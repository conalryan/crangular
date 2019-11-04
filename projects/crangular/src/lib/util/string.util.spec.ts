import { StringUtil } from './string.util';

describe('String Util', () => {
  describe('orEmpty', () => {
    it('returns an empty string if we pass undefined or null', () => {
      expect(StringUtil.orEmpty(undefined)).toEqual('');
      expect(StringUtil.orEmpty(null)).toEqual('');
      expect(StringUtil.orEmpty('0')).toBe('0');
    });

    it('returns an the string if we pass a valid string', () => {
      expect(StringUtil.orEmpty('0')).toBe('0');
      expect(StringUtil.orEmpty('true')).toBe('true');
      expect(StringUtil.orEmpty('myowncustomstring')).toBe('myowncustomstring');
    });

    it('returns an the string with a delimiter if we pass a valid string', () => {
      expect(StringUtil.orEmpty('mystring', ' .')).toBe('mystring .');
    });
  });

  describe('isNotBlank', () => {
    it('should return true', () => {
      let str = 'a';
      expect(StringUtil.isNotBlank(str)).toBeTruthy();

      str = '   a    ';
      expect(StringUtil.isNotBlank(str)).toBeTruthy();

      str = '     a      b';
      expect(StringUtil.isNotBlank(str)).toBeTruthy();

      str = 'a      b       ';
      expect(StringUtil.isNotBlank(str)).toBeTruthy();
    });

    it('should return false', () => {
      let str = '';
      expect(StringUtil.isNotBlank(str)).toBeFalsy();

      str = ' ';
      expect(StringUtil.isNotBlank(str)).toBeFalsy();

      str = '             ';
      expect(StringUtil.isNotBlank(str)).toBeFalsy();
    });
  });

  describe('findParamValue', () => {
    it('should return param value with valid input params', () => {
      let exampleSource = '<ExampleXML exampleParamOne="ExampleValueOne" exampleParamTwo="ExampleValueTwo"/>';
      expect(StringUtil.findParamValue(exampleSource, 'exampleParamOne')).toBe('ExampleValueOne');
    });

    it('should return param value with valid input params 2', () => {
      let exampleSource = '<ExampleXML exampleParamOne="ExampleValueOne" exampleParamTwo="ExampleValueTwo"/>';
      expect(StringUtil.findParamValue(exampleSource, 'exampleParamTwo')).toBe('ExampleValueTwo');
    });

    it('should return null with invalid input params', () => {
      let exampleSource = '<ExampleXML exampleParamOne="ExampleValueOne" exampleParamTwo="ExampleValueTwo"/>';
      expect(StringUtil.findParamValue(exampleSource, 'nonExistent')).toBe(null);
    });
  })

});
