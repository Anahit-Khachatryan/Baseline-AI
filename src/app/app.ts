import { Component, inject, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './core/header/header.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeature } from './core/store/features/auth.feature';
import { LoginComponent } from './features/login/login.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  private readonly store = inject(Store);
  
  private user$ = this.store.select(authFeature.selectUser);
  user = toSignal(this.user$);
  
  isAuthenticated = computed(() => !!this.user());
}
