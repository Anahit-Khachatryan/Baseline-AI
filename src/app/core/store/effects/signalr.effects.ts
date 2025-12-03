import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignalRActions } from '../actions/signalr.actions';
import { AuthActions } from '../actions/auth.actions';
import { SignalRService } from '../../signalr/signalr.service';
import { map, catchError, of, tap } from 'rxjs';

export const startConnection$ = createEffect(
  (actions = inject(Actions), signalRService = inject(SignalRService)) => {
    return actions.pipe(
      ofType(SignalRActions.startConnection),
      map(() => {
        console.log('Starting connection');
        signalRService.startConnection();
        return SignalRActions.connectionStarted();
      }),
      catchError((err: unknown) => {
        const error = err instanceof Error ? err.message : 'Connection failed';
        return of(SignalRActions.connectionError({ error }));
      }),
    );
  },
  { functional: true },
);

export const disconnect$ = createEffect(
  (actions = inject(Actions), signalRService = inject(SignalRService)) => {
    return actions.pipe(
      ofType(SignalRActions.disconnect),
      map(() => {
        signalRService.disconnect();
        return SignalRActions.disconnected();
      }),
    );
  },
  { functional: true },
);

export const userDeactivated$ = createEffect(
  (actions = inject(Actions), store = inject(Store)) => {
    return actions.pipe(
      ofType(SignalRActions.userDeactivated),
      tap(({ userId }) => {
        // Logout the deactivated user
        store.dispatch(AuthActions.logout());
        console.log(`User ${userId} has been deactivated`);
      }),
    );
  },
  { functional: true, dispatch: false },
);

