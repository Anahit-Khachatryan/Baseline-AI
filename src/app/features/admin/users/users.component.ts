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
import { phoneCrossFieldValidator } from '../../../shared/validators/phone.validator';
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
  countryCodes = this.store.selectSignal(lookupFeature.selectCountryCodes);


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
    phoneCountryCode: ['', Validators.required],
    phone: ['', [Validators.required]],
    department: ['', Validators.required],
  }, { validators: phoneCrossFieldValidator() });

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
    // Extract country code from phone if it exists
    const phoneCountryCode = user.phone?.startsWith('+') 
      ? user.phone.split(' ')[0] || '+374'
      : '+374';
    const phoneNumber = user.phone?.includes(' ') 
      ? user.phone.split(' ').slice(1).join(' ')
      : user.phone || '';
    
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
      phoneCountryCode: phoneCountryCode,
      phone: phoneNumber,
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
    
    // Combine country code and phone number
    const phone = `${formValue.phoneCountryCode} ${formValue.phone}`.trim();
    const userData = {
      ...formValue,
      phone,
      phoneCountryCode: undefined, // Remove from final data
    };

    if (editing) {
      this.store.dispatch(
        UsersActions.updateUser({
          userData: {
            id: editing.id,
            ...userData,
          },
        }),
      );
    } else {
      this.store.dispatch(
        UsersActions.createUser({
          userData: userData as CreateUserRequest,
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
