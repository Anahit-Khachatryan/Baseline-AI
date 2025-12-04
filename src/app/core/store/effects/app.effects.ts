import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.actions';
import { AppActions } from '../actions/app.actions';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

export const applicationInit$ = createEffect(
  (actions = inject(Actions), localStorageService = inject(LocalStorageService)) => {
    return actions.pipe(
      ofType(AppActions.appInit),
      map(() => {
        const token = localStorageService.get('token') ?? '';
        return AuthActions.setToken({ token });
      }),
    );
  },
  { functional: true },
);
