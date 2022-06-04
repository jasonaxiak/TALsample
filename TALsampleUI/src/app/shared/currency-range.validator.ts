import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/* Range validator that can handle currency formatted values */
export function currenyRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const amount = Number(control.value.replace(/\D/g, ''));
    return amount == NaN || amount < min || amount > max ? { invalidRange: { value: control.value } } : null;
  };
}

