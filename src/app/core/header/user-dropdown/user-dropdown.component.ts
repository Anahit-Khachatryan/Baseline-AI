import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';


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
  profileClick = output<void>();
  settingsClick = output<void>();
  logoutClick = output<void>();

  handleProfile(event: Event) {
    event.stopPropagation();
    this.profileClick.emit();
  }

  handleSettings(event: Event) {
    event.stopPropagation();
    this.settingsClick.emit();
  }

  handleLogout(event: Event) {
    event.stopPropagation();
    this.logoutClick.emit();
  }
}

