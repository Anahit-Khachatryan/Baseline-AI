import {
  Component,
  computed,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { authFeature } from '../../core/store/features/auth.feature';
import { AuthActions } from '../../core/store/actions/auth.actions';
import { NotificationsComponent } from '../notifications/notifications.component';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NotificationsComponent, UserDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly store = inject(Store);
  user = this.store.selectSignal(authFeature.selectUser);

  userProfile = computed(() => {
    const currentUser = this.user();
    if (!currentUser) {
      return {
        initials: '??',
        name: 'Unknown User',
        role: 'Unknown',
      };
    }
    return currentUser;
  });

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

