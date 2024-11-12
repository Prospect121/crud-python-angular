import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/user-create/user-create.component').then(
        (m) => m.UserCreateComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./pages/user-update/user-update.component').then(
        (m) => m.UserUpdateComponent
      ),
  },
];
