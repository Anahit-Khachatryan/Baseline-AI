import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../store/features/auth.feature';
import { map } from 'rxjs/operators';

export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(authFeature.selectIsAuthorized).pipe(
    map((isAuthorized) =>
      isAuthorized ? router.createUrlTree(['/dashboard']) : true,
    ),
  );
};
