import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormControlPipe } from './form-control.pipe';

describe('FormControlPipe', () => {
  let pipe: FormControlPipe;

  beforeEach(() => {
    pipe = new FormControlPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the control when form group has the specified control name', () => {
    const formGroup = new FormGroup({
      name: new FormControl('John'),
      age: new FormControl(25),
    });

    const result = pipe.transform(formGroup, 'name');

    expect(result).toBe(formGroup.get('name'));
  });

  it('should return the control when form array has the specified control name', () => {
    const formArray = new FormArray([new FormControl('Apple'), new FormControl('Banana')]);

    const result = pipe.transform(formArray, '0');

    expect(result).toBe(formArray.controls[0]);
  });

  it('should return null when form is null', () => {
    const result = pipe.transform(null as any, 'name');

    expect(result).toBeNull();
  });

  it('should return null when form does not have the specified control name', () => {
    const formGroup = new FormGroup({
      name: new FormControl('John'),
      age: new FormControl(25),
    });

    const result = pipe.transform(formGroup, 'email');

    expect(result).toBeNull();
  });
});
