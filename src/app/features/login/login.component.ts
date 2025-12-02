import {
  Component,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/store/actions/authorization.actions';
import { authorizationFeature } from '../../core/store/features/auth.feature';
import { Credentials } from '../../core/store/models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  loading$ = this.store.select(authorizationFeature.selectLoading);
  error$ = this.store.select(authorizationFeature.selectError);

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: Credentials = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ credentials }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

