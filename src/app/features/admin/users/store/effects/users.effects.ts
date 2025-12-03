import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UsersActions } from '../actions/users.actions';
import { UsersService } from '../../services/users.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const loadUsers$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) => {
    return actions.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        usersService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error: unknown) => {
            const message =
              error instanceof Error ? error.message : 'Failed to load users';
            return of(UsersActions.loadUsersFailure({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const createUser$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) => {
    return actions.pipe(
      ofType(UsersActions.createUser),
      switchMap(({ userData }) =>
        usersService.createUser(userData).pipe(
          map((user) => UsersActions.createUserSuccess({ user })),
          catchError((error: unknown) => {
            const message =
              error instanceof Error ? error.message : 'Failed to create user';
            return of(UsersActions.createUserFailure({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const updateUser$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) => {
    return actions.pipe(
      ofType(UsersActions.updateUser),
      switchMap(({ userData }) =>
        usersService.updateUser(userData).pipe(
          map((user) => UsersActions.updateUserSuccess({ user })),
          catchError((error: unknown) => {
            const message =
              error instanceof Error ? error.message : 'Failed to update user';
            return of(UsersActions.updateUserFailure({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteUser$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) => {
    return actions.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({ id }) =>
        usersService.deleteUser(id).pipe(
          map((success) => {
            if (!success) {
              throw new Error('Failed to delete user');
            }
            return UsersActions.deleteUserSuccess({ id });
          }),
          catchError((error: unknown) => {
            const message =
              error instanceof Error ? error.message : 'Failed to delete user';
            return of(UsersActions.deleteUserFailure({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteUsers$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) => {
    return actions.pipe(
      ofType(UsersActions.deleteUsers),
      switchMap(({ ids }) =>
        usersService.deleteUsers(ids).pipe(
          map((success) => {
            if (!success) {
              throw new Error('Failed to delete users');
            }
            return UsersActions.deleteUsersSuccess({ ids });
          }),
          catchError((error: unknown) => {
            const message =
              error instanceof Error ? error.message : 'Failed to delete users';
            return of(UsersActions.deleteUsersFailure({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

