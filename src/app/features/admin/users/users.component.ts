import {
  Component,
  computed,
  signal,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { User, CreateUserRequest } from '../../../shared/models/admin-user.models';
import { UsersActions } from './store/actions/users.actions';
import { usersFeature } from './store/features/users.feature';
import { lookupFeature } from '../../../core/store/features/lookup.feature';
import { LookupActions } from '../../../core/store/actions/lookup.actions';
import { ValidationErrorDirective } from '../../../shared/directives/validation-error.directive';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TagModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    SelectModule,
    ValidationErrorDirective,
  ],
  providers: [ConfirmationService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);

  // Store selectors
  users = this.store.selectSignal(usersFeature.selectUsers);
  loading = this.store.selectSignal(usersFeature.selectLoading);
  // error = this.store.selectSignal(usersFeature.selectError);
  
  // Lookup selectors
  roles = this.store.selectSignal(lookupFeature.selectRoles);
  statuses = this.store.selectSignal(lookupFeature.selectStatuses);
  departments = this.store.selectSignal(lookupFeature.selectDepartments);

  // Local UI state
  searchText = signal('');
  displayDialog = signal(false);
  editingUser = signal<User | null>(null);
  
  // Reactive form
  userForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    status: ['Active'],
    phone: [''],
    department: [''],
  });

  // Computed properties for filtering
  filteredData = computed(() => {
    let result = [...this.users()];

    // Search filter
    const search = this.searchText().toLowerCase();
    if (search) {
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.phone.includes(search),
      );
    }

    return result;
  });

  ngOnInit(): void {
    // Load users and lookups on component init
    this.store.dispatch(UsersActions.loadUsers());
    this.store.dispatch(LookupActions.loadLookups());
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText.set(target.value);
  }

  openNew(): void {
    this.editingUser.set(null);
    this.userForm.reset();
    this.displayDialog.set(true);
  }

  editUser(user: User): void {
    this.editingUser.set(user);
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
      department: user.department,
    });
    this.displayDialog.set(true);
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
      },
    });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value;
    const editing = this.editingUser();

    if (editing) {
      this.store.dispatch(
        UsersActions.updateUser({
          userData: {
            id: editing.id,
            ...formValue,
          },
        }),
      );
    } else {
      this.store.dispatch(
        UsersActions.createUser({
          userData: formValue as CreateUserRequest,
        }),
      );
    }

    this.displayDialog.set(false);
    this.editingUser.set(null);
    this.userForm.reset();
  }

  onDialogHide(): void {
    this.editingUser.set(null);
    this.userForm.reset();
  }

}
