import {FormGroup} from "@angular/forms";

export const setFormControl = (formGroup: FormGroup, property: string, value: any, onlySelf = false): void => {
  const fc = formGroup.get(property);
  fc.patchValue(value);
  fc.markAsDirty({onlySelf: onlySelf});
  fc.markAsTouched({onlySelf: onlySelf});
};
