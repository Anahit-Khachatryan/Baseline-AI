import {
  ActionProcessedNotification,
} from '../models/signalr.models';

export interface SignalRState {
  isConnected: boolean;
  error: string | null;
  deactivatedUserId: string | null;
  actionProcessedNotifications: ActionProcessedNotification[];
}

export const initialState: SignalRState = {
  isConnected: false,
  error: null,
  deactivatedUserId: null,
  actionProcessedNotifications: [],
};

