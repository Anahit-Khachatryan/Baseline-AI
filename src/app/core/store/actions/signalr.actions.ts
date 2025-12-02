import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ActionProcessedNotification,
} from '../models/signalr.models';

export const SignalRActions = createActionGroup({
  source: '[SignalR]',
  events: {
    'Start Connection': emptyProps(),
    'Connection Started': emptyProps(),
    'Connection Error': props<{ error: string }>(),

    'User Deactivated': props<{ userId: number }>(),
    'Action Processed': props<{ notification: ActionProcessedNotification }>(),
    'Disconnect': emptyProps(),
    'Disconnected': emptyProps(),
  },
});

