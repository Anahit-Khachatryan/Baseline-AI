import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './core/store/actions/authorization.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly store = inject(Store);

  testAction() {
    this.store.dispatch(
      AuthActions.login({
        credentials: {
          username: 'admin',
          password: '123',
        },
      }),
    );
  }
}
