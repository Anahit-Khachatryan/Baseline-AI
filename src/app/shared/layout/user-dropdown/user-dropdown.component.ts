import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PopoverModule } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AuthActions } from '../../../core/store/actions/auth.actions';
@Component({
  selector: 'app-user-dropdown',
  imports: [
    PopoverModule,
    AvatarModule,
    ButtonModule,
  ],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent {
  userProfile = input.required<any>();
  private readonly store = inject(Store);
  handleProfile(event: Event) {
    event.stopPropagation();
  }
  handleSettings(event: Event) {
    event.stopPropagation();
  }
  handleLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}

