import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { FormControlPipe } from '../../shared/pipes/form-control/form-control.pipe';
import { RequiredPipe } from '../../shared/pipes/required/required.pipe';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe, RequiredPipe],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
  });

  constructor(private userService: UserService, private route: Router) {}

  handleAdd(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const values = this.form.value as unknown as IUser;
    this.userService.createUser(values).subscribe((_) => {
      this.route.navigateByUrl('/');
    });
  }
}
