import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { LookupActions } from '../actions/lookup.actions';
import { LookupService } from '../../../shared/services/lookup.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const loadLookups$ = createEffect(
  (actions = inject(Actions), lookupService = inject(LookupService)) => {
    return actions.pipe(
      ofType(LookupActions.loadLookups),
      switchMap(() =>
        lookupService.getLookups().pipe(
          map((lookups) => LookupActions.loadLookupsSuccess({ lookups })),
          catchError((error: unknown) => {
            const message =
              error instanceof Error ? error.message : 'Failed to load lookups';
            return of(LookupActions.loadLookupsFailure({ error: message }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

