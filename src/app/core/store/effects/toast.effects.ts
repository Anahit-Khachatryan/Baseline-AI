import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';
import { UsersActions } from '../../../features/admin/users/store/actions/users.actions';
import { AuthActions } from '../actions/auth.actions';


export const showUserSuccessToasts$ = createEffect(
  (
    actions = inject(Actions),
    toastService = inject(ToastService),
  ) => {
    return actions.pipe(
      ofType(
        AuthActions.loginSuccess,
        AuthActions.logoutSuccess,
        UsersActions.createUserSuccess,
        UsersActions.updateUserSuccess,
        UsersActions.deleteUserSuccess,
        UsersActions.deleteUsersSuccess,
      ),
      tap((action) => {
        if (action.type === UsersActions.createUserSuccess.type) {
          toastService.success('User created successfully');
        } else if (action.type === UsersActions.updateUserSuccess.type) {
          toastService.success('User updated successfully');
        } else if (action.type === UsersActions.deleteUserSuccess.type) {
          toastService.success('User deleted successfully');
        } else if (action.type === UsersActions.deleteUsersSuccess.type) {
          const count = action.ids.length;
          toastService.success(
            `${count} user(s) deleted successfully`,
          );
        }
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const showUserErrorToasts$ = createEffect(
  (
    actions = inject(Actions),
    toastService = inject(ToastService),
  ) => {
    return actions.pipe(
      ofType(
        UsersActions.loadUsersFailure,
        UsersActions.createUserFailure,
        UsersActions.updateUserFailure,
        UsersActions.deleteUserFailure,
        UsersActions.deleteUsersFailure,
      ),
      tap((action) => {
        toastService.error(action.error);
      }),
    );
  },
  { functional: true, dispatch: false },
);


