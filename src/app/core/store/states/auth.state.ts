import type { User } from '../models/auth.models';

export interface AuthState {
  token: string;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  token: '',
  user: null,
  loading: false,
  error: null,
};
