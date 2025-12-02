import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { initialState } from '../states/signalr.state';
import { SignalRActions } from '../actions/signalr.actions';
import { Features } from '../features.enum';
import { immerOn } from 'ngrx-immer/store';

export const signalrReducer = createReducer(
  initialState,
  immerOn(SignalRActions.startConnection, (state) => {
    state.error = null;
  }),
  immerOn(SignalRActions.connectionStarted, (state) => {
    state.isConnected = true;
    state.error = null;
  }),
  immerOn(SignalRActions.connectionError, (state, { error }) => {
    state.isConnected = false;
    state.error = error;
  }),
  immerOn(SignalRActions.userDeactivated, (state, { userId }) => {
    state.deactivatedUserId = userId.toString();
  }),
  immerOn(
    SignalRActions.actionProcessed,
    (state, { notification }) => {
      state.actionProcessedNotifications.push(notification);
    },
  ),
  immerOn(SignalRActions.disconnect, SignalRActions.disconnected, (state) => {
    state.isConnected = false;
    state.error = null;
    state.deactivatedUserId = null;
    state.actionProcessedNotifications = [];
  }),
);

export const signalrFeature = createFeature({
  name: Features.SignalR,
  reducer: signalrReducer,
  extraSelectors: ({ selectIsConnected, selectDeactivatedUserId }) => ({
    selectConnectionStatus: createSelector(
      selectIsConnected,
      (isConnected) => isConnected,
    ),
    selectHasDeactivatedUser: createSelector(
      selectDeactivatedUserId,
      (userId) => !!userId,
    ),
  }),
});

