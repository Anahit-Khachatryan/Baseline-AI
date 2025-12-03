import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../../../../../shared/models/admin-user.models";

export const UsersActions = createActionGroup({
  source: '[Users]',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Create User': props<{ userData: CreateUserRequest }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Failure': props<{ error: string }>(),

    'Update User': props<{ userData: UpdateUserRequest }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: string }>(),

    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Failure': props<{ error: string }>(),

    'Delete Users': props<{ ids: number[] }>(),
    'Delete Users Success': props<{ ids: number[] }>(),
    'Delete Users Failure': props<{ error: string }>(),

    'Set Selected Users': props<{ users: User[] }>(),
    'Clear Selected Users': emptyProps(),
  },
});

