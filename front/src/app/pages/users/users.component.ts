import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: Observable<IUser[]> = new Observable<IUser[]>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
}
