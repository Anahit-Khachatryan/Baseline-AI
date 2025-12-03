import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { initialState } from '../states/users.state';
import { UsersActions } from '../actions/users.actions';
import { immerOn } from 'ngrx-immer/store';

export const usersReducer = createReducer(
  initialState,
  immerOn(UsersActions.loadUsers, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(UsersActions.loadUsersSuccess, (state, { users }) => {
    state.users = users;
    state.loading = false;
    state.error = null;
  }),
  immerOn(UsersActions.loadUsersFailure, (state, { error }) => {
    state.loading = false;
    state.error = error;
  }),
  immerOn(UsersActions.createUser, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(UsersActions.createUserSuccess, (state, { user }) => {
    state.users.push(user);
    state.loading = false;
    state.error = null;
  }),
  immerOn(UsersActions.createUserFailure, (state, { error }) => {
    state.loading = false;
    state.error = error;
  }),
  immerOn(UsersActions.updateUser, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(UsersActions.updateUserSuccess, (state, { user }) => {
    const index = state.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      state.users[index] = user;
    }
    state.loading = false;
    state.error = null;
  }),
  immerOn(UsersActions.updateUserFailure, (state, { error }) => {
    state.loading = false;
    state.error = error;
  }),
  immerOn(UsersActions.deleteUser, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(UsersActions.deleteUserSuccess, (state, { id }) => {
    state.users = state.users.filter((u) => u.id !== id);
    state.selectedUsers = state.selectedUsers.filter((u) => u.id !== id);
    state.loading = false;
    state.error = null;
  }),
  immerOn(UsersActions.deleteUserFailure, (state, { error }) => {
    state.loading = false;
    state.error = error;
  }),
  immerOn(UsersActions.deleteUsers, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(UsersActions.deleteUsersSuccess, (state, { ids }) => {
    const idsSet = new Set(ids);
    state.users = state.users.filter((u) => !idsSet.has(u.id));
    state.selectedUsers = [];
    state.loading = false;
    state.error = null;
  }),
  immerOn(UsersActions.deleteUsersFailure, (state, { error }) => {
    state.loading = false;
    state.error = error;
  }),
  immerOn(UsersActions.setSelectedUsers, (state, { users }) => {
    state.selectedUsers = users;
  }),
  immerOn(UsersActions.clearSelectedUsers, (state) => {
    state.selectedUsers = [];
  }),
);

export const usersFeature = createFeature({
  name: 'users',
  reducer: usersReducer,
  extraSelectors: ({ selectUsers, selectSelectedUsers }) => ({
    selectUsersCount: createSelector(selectUsers, (users) => users.length),
    selectSelectedUsersCount: createSelector(
      selectSelectedUsers,
      (users) => users.length,
    ),
  }),
});

