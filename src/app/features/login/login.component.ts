import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/store/actions/authorization.actions';
import { authFeature } from '../../core/store/features/auth.feature';
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

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  loading$ = this.store.select(authFeature.selectLoading);
  error$ = this.store.select(authFeature.selectError);

  onSubmit(): void {
    if (this.form.valid) {
      const credentials: Credentials = this.form.value;
      this.store.dispatch(AuthActions.login({ credentials }));
    } else {
      this.form.markAllAsTouched();
    }
  }
}
