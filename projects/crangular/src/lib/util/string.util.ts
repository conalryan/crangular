export class StringUtil {
  private constructor() {
    // prevent instantiation
  }

  /**
   * Returns empty string if the input is null or undefined
   * additionally we can pass a delimiter if we want to append a , or . if the value is not null or undefined
   * @param {string} str
   * @param delimiter
   * @returns {string}
   */
  static orEmpty(str: string, delimiter?: string): string {
    return str == null ? '' : delimiter ? str + delimiter : str;
  }

  /**
   * Returns if a string is not blank and not empty.
   * @param str
   */
  static isNotBlank(str: string): boolean {
    return !!('' || str.trim());
  }

  static isString(str): boolean {
    return typeof str === 'string' || str instanceof String;
  }

  /**
   * Returns the value associated with a parameter, meant for importing the arguments found inside self-closing XML tags, if the argument is not found, returns null
   * ex. <ExampleXML exampleParam="exampleValue" secondExampleParam="secondExampleValue"/>
   * Additionally: this is designed to looks for param values that may or may not be enclosed within \ delimiters, therefore we cannot assume that the first quote will be two chars away
   * from the parameter name (name=") and must look for the first quote 'manually'
   * findParamValue(example, "exampleParam") returns "exampleValue"
   * findParamValue(example, "nonExistentParam") returns null
   * @param {string} source
   * @param {string} param
   * @returns {string}
   */
  static findParamValue(source: string, param: string) : string | null {
    if (source.includes(param)) {
      const index = source.indexOf(param);
      const lastIndex = index + param.length;
      let i = 0;
      let j = 0;

      let firstQuote = false;
      let secondQuote = false;

      while (!firstQuote) {
        if (source.charAt(lastIndex + i) === '\"') {
          firstQuote = true;
          i++;
          j = i;
        } else {
          i++;
        }
      }

      while (!secondQuote) {
        if (source.charAt(lastIndex + j) === '\"') {
          secondQuote = true;
        } else {
          j++;
        }
      }

      return source.substring(lastIndex + i, lastIndex + j);
    }
    return null;
  }
}
