export class ObjectUtil {

  private constructor() {
    //prevent instantiation
  }

  /**
   * https://stackoverflow.com/questions/34201483/deep-clone-in-typescript-preserving-types
   * https://github.com/cr/onvel/tree-kit/blob/master/lib/clone.js
   *
   * @param originalObject
   * @param circular
   * @returns {Array | any}
   */
  static deepClone(originalObject, circular) {
    if (originalObject === null || originalObject === undefined) {
      return originalObject;
    }
    // First create an empty object with same prototype of our original source
    const copies = [
      {
        source: originalObject,
        target: Array.isArray(originalObject) ? [] : Object.create(Object.getPrototypeOf(originalObject))
      }
    ];
    const cloneObject = copies[0].target;
    const sourceReferences = [originalObject];
    const targetReferences = [cloneObject];

    let keys;
    let propertyIndex;
    let propertyDescriptor;
    let nextSource;
    let indexOf;

    let currentCopy = copies.shift();

    // First in, first out
    while (currentCopy) {
      // jshint ignore:line
      keys = Object.getOwnPropertyNames(currentCopy.source);

      for (propertyIndex = 0; propertyIndex < keys.length; propertyIndex++) {
        // Save the source's descriptor
        propertyDescriptor = Object.getOwnPropertyDescriptor(currentCopy.source, keys[propertyIndex]);

        // Primitive value, assign it to the target
        if (!propertyDescriptor.value || typeof propertyDescriptor.value !== 'object') {
          Object.defineProperty(currentCopy.target, keys[propertyIndex], propertyDescriptor);
          continue;
        }

        // Embedded object
        nextSource = propertyDescriptor.value;
        // Create an empty object with the same prototype as the embedded object and overwrite the current value.
        propertyDescriptor.value = Array.isArray(nextSource) ? [] : Object.create(Object.getPrototypeOf(nextSource));

        if (circular) {
          indexOf = sourceReferences.indexOf(nextSource);
          if (indexOf !== -1) {
            // The source is already referenced, just assign reference
            propertyDescriptor.value = targetReferences[indexOf];
            Object.defineProperty(currentCopy.target, keys[propertyIndex], propertyDescriptor);
            continue;
          }
          sourceReferences.push(nextSource);
          targetReferences.push(propertyDescriptor.value);
        }
        // Define the property on the target with an empty value.
        Object.defineProperty(currentCopy.target, keys[propertyIndex], propertyDescriptor);
        copies.push({ source: nextSource, target: propertyDescriptor.value });
      }
      currentCopy = copies.shift();
    }
    return cloneObject;
  }

}
