import { Component, inject, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './features/login';
import { authorizationFeature } from './core/store/features/auth.feature';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly store = inject(Store);
  
  private user$ = this.store.select(authorizationFeature.selectUser);
  user = toSignal(this.user$);
  
  isAuthenticated = computed(() => !!this.user());
}
