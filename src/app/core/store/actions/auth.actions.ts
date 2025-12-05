import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Credentials, User } from '../models/auth.models';

export const AuthActions = createActionGroup({
  source: '[Auth]',
  events: {
    'Load Session': emptyProps(),
    'Load Session Success': props<{ user: User }>(),
    'Load Session Error': props<{ error: string }>(),

    'Login': props<{ credentials: Credentials }>(),
    'Login Success': props<{ token: string; user: User }>(),
    'Login Error': props<{ error: string }>(),

    'Set Token': props<{ token: string }>(),
    'Set User': props<{ user: User | null }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
  },
});
