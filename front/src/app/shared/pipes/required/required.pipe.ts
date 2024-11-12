import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'required',
  standalone: true,
})
export class RequiredPipe implements PipeTransform {
  transform(field: AbstractControl | null): boolean {
    if (field && field.validator) {
      const validator = (field as any).validator({} as AbstractControl);
      return validator && validator.required;
    }
    return false;
  }
}
