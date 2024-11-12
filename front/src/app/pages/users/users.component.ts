import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]> = new Observable<IUser[]>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this._getUsers();
  }

  handleDelete(param: number | undefined): void {
    if (!param) {
      return;
    }
    this.userService.removeUser(param).subscribe(() => {
      this._getUsers();
    });
  }

  private _getUsers(): void {
    this.users$ = this.userService.getUsers();
  }
}
