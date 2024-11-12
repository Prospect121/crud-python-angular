import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormControlPipe } from '../../shared/pipes/form-control/form-control.pipe';
import { RequiredPipe } from '../../shared/pipes/required/required.pipe';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe, RequiredPipe],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  form = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required),
    name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    private userService: UserService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.activeRoute.snapshot.paramMap.get('id');
    if (userId === null) return;
    this.subs = this.userService.getUserById(+userId).subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  handleUpdate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const values = this.form.value as unknown as IUser;
    this.userService.updateUser(values).subscribe((_) => {
      this.route.navigateByUrl('/');
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
