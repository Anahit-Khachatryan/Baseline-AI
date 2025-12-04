import {
  Component,
  computed,
  ChangeDetectionStrategy,
  inject,
  isDevMode,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { signalrFeature } from '../../../core/store/features/signalr.feature';
import { SignalRActions } from '../../../core/store/actions/signalr.actions';
import { SignalRService } from '../../../core/signalr/signalr.service';

@Component({
  selector: 'app-notifications',
  imports: [PopoverModule, ButtonModule, BadgeModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  private readonly store = inject(Store);

  notifications = this.store.selectSignal(
    signalrFeature.selectActionProcessedNotifications,
  );
  unreadCount = computed(() => this.notifications().length);
  isConnected = this.store.selectSignal(signalrFeature.selectIsConnected);

  //for testing, after real data remove this
  isTestMode = isDevMode();
  startConnection() {
    this.store.dispatch(SignalRActions.startConnection());
    console.log('SignalR connection started');
  }
  disconnect() {
    this.store.dispatch(SignalRActions.disconnect());
    console.log('SignalR connection disconnected');
  }



  signalrService = inject(SignalRService);
  //for testing, after real data remove this
  simulateNotification() {
    // Use the service method if mock mode is enabled, otherwise dispatch directly
    if (this.signalrService.sendTestNotification) {
      this.signalrService.sendTestNotification(
        `Test notification ${new Date().toLocaleTimeString()}`,
      );
    } else {
      // Fallback: dispatch directly if service method not available
      this.store.dispatch(
        SignalRActions.actionProcessed({
          notification: {
            actionId: Math.floor(Math.random() * 1000),
            actionName: 'Test Action',
            entityName: 'Test Entity',
            entityIds: [1, 2, 3],
            modifierId: 1,
            message: `Test notification ${new Date().toLocaleTimeString()}`,
          },
        }),
      );
      console.log('Test notification dispatched');
    }
  }
}
