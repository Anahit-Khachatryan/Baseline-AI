import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment.dev';
import { SignalRActions } from '../store/actions/signalr.actions';
import type { ActionListenerData } from '../store/models/signalr.models';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private readonly store = inject(Store);

  private readonly _baseUrl: string = environment.apiBaseUrl;
  private readonly _notifyEndpoint: string = environment.signalrNotificationEndpoint;
  private readonly _useMock: boolean = environment.useMockSignalR ?? false;
  private hubConnection: signalR.HubConnection | null | undefined;
  private isConnected = false;
  private mockIntervalId: ReturnType<typeof setInterval> | null = null;

  startConnection() {
    if (this.isConnected) {
      return;
    }

    if (this._useMock) {
      this.startMockConnection();
    } else {
      this.startRealConnection();
    }
  }

  private startRealConnection() {
    if (!this.isConnected) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this._baseUrl}${this._notifyEndpoint}`)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      console.log(`Connecting to: ${this._baseUrl}${this._notifyEndpoint}`);

      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started');
          this.isConnected = true;
          this.store.dispatch(SignalRActions.connectionStarted());
          this.addUserDeactivatedListener();
          this.addActionProcessedListener();
        })
        .catch((err: { toString: () => any }) => {
          const error = err.toString();
          console.error(error);
          this.store.dispatch(SignalRActions.connectionError({ error }));
        });
    }
  }

  private addUserDeactivatedListener(): void {
    this.hubConnection?.on('OnUserDeactivated', (userId: number) => {
      this.store.dispatch(SignalRActions.userDeactivated({ userId }));
    });
  }

  private addActionProcessedListener(): void {
    this.hubConnection?.on(
      'OnActionProcessed',
      (data: ActionListenerData, message: string) => {
        this.store.dispatch(
          SignalRActions.actionProcessed({
            notification: {
              ...data,
              message,
            },
          }),
        );
      },
    );
  }

  disconnect() {
    if (this._useMock) {
      console.log('[MOCK] Disconnecting SignalR');
      this.isConnected = false;
      if (this.mockIntervalId) {
        clearInterval(this.mockIntervalId);
        this.mockIntervalId = null;
      }
      this.store.dispatch(SignalRActions.disconnected());
    } else if (this.hubConnection) {
      this.hubConnection.stop();
      this.hubConnection = null;
      this.isConnected = false;
    }
  }

  private startMockConnection() {
    console.log('[MOCK] Starting SignalR connection (Mock Mode)');
    console.log(`[MOCK] Would connect to: ${this._baseUrl}${this._notifyEndpoint}`);

    // Simulate connection delay
    setTimeout(() => {
      console.log('[MOCK] Connection started');
      this.isConnected = true;
      this.store.dispatch(SignalRActions.connectionStarted());

      // Start sending mock notifications periodically for testing
      this.startMockNotifications();
    }, 500);
  }
  private startMockNotifications() {
    // Send a welcome notification immediately
    this.sendMockNotification({
      actionId: 1,
      actionName: 'Welcome',
      entityName: 'System',
      entityIds: [1],
      modifierId: 0,
      message: 'SignalR connection established (Mock Mode)',
    });

    // Send periodic test notifications every 10 seconds
    this.mockIntervalId = setInterval(() => {
      const actions = [
        'User Created',
        'Data Updated',
        'File Processed',
        'Report Generated',
        'Task Completed',
      ];
      const entities = ['User', 'Order', 'Document', 'Report', 'Task'];
      const randomAction =
        actions[Math.floor(Math.random() * actions.length)];
      const randomEntity =
        entities[Math.floor(Math.random() * entities.length)];

      this.sendMockNotification({
        actionId: Math.floor(Math.random() * 10000),
        actionName: randomAction,
        entityName: randomEntity,
        entityIds: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
        ],
        modifierId: Math.floor(Math.random() * 10),
        message: `${randomAction} for ${randomEntity} #${Math.floor(Math.random() * 1000)}`,
      });
    }, 10000); // Every 10 seconds
  }
   // Public method to manually send test notifications (useful for testing)
   sendTestNotification(message?: string) {
    if (!this._useMock || !this.isConnected) {
      console.warn(
        '[MOCK] Cannot send test notification. Mock mode must be enabled and connection must be active.',
      );
      return;
    }

    this.sendMockNotification({
      actionId: Math.floor(Math.random() * 10000),
      actionName: 'Test Action',
      entityName: 'Test Entity',
      entityIds: [Math.floor(Math.random() * 100)],
      modifierId: 1,
      message: message || `Test notification at ${new Date().toLocaleTimeString()}`,
    });
  }

  private sendMockNotification(data: ActionListenerData & { message: string }) {
    console.log('[MOCK] Sending notification:', data);
    this.store.dispatch(
      SignalRActions.actionProcessed({
        notification: data,
      }),
    );
  }
}

