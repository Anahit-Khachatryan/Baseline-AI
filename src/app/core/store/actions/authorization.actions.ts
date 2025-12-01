import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Credentials } from '../models/auth.models';

export const AuthActions = createActionGroup({
  source: '[Auth]',
  events: {
    'Login': props<{ credentials: Credentials }>(),
    'Login Success': props<{ token: string }>(),
    'Login Error': props<{ error: string }>(),

    'Set Token': props<{ token: string }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
  },
});
