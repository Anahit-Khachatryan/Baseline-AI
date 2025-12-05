import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { initialState } from '../states/auth.state';
import { AuthActions } from '../actions/auth.actions';
import { Features } from '../features.enum';
import { immerOn } from 'ngrx-immer/store';

export const authReducer = createReducer(
  initialState,
  // Load session from cookie
  immerOn(AuthActions.loadSession, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(AuthActions.loadSessionSuccess, (state, { user }) => {
    state.user = user;
    state.loading = false;
    state.error = null;
  }),
  immerOn(AuthActions.loadSessionError, (state, { error }) => {
    state.user = null;
    state.loading = false;
    state.error = error ?? 'Unknown error';
  }),
  immerOn(AuthActions.login, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(AuthActions.loginSuccess, (state, { token, user }) => {
    state.token = token;
    state.user = user;
    state.loading = false;
    state.error = null;
  }),
  immerOn(AuthActions.setToken, (state, { token }) => {
    state.token = token;
  }),
  immerOn(AuthActions.setUser, (state, { user }) => {
    state.user = user;
  }),
  immerOn(AuthActions.loginError, (state, { error }) => {
    state.error = error ?? 'Unknown error';
    state.loading = false;
  }),
  immerOn(AuthActions.logout, AuthActions.logoutSuccess, (state) => {
    state.token = '';
    state.user = null;
    state.loading = false;
    state.error = null;
  }),
);

export const authFeature = createFeature({
  name: Features.Auth,
  reducer: authReducer,
  extraSelectors: ({ selectUser }) => ({
    selectIsAuthorized: createSelector(selectUser, (user) => !!user),
  }),
});
