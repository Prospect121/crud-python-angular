import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Pipe({
  name: 'formControl',
  standalone: true,
})
export class FormControlPipe implements PipeTransform {
  transform(form: FormGroup | FormArray, ...args: string[]): AbstractControl | null {
    return form ? form.get(args) : null;
  }
}

