import {
  Component,
  computed,
  signal,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { User, CreateUserRequest } from '../../../shared/models/admin-user.models';
import { UsersActions } from './store/actions/users.actions';
import { usersFeature } from './store/features/users.feature';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TagModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly confirmationService = inject(ConfirmationService);

  // Store selectors
  users = this.store.selectSignal(usersFeature.selectUsers);
  selectedUsers = this.store.selectSignal(usersFeature.selectSelectedUsers);
  loading = this.store.selectSignal(usersFeature.selectLoading);
  // error = this.store.selectSignal(usersFeature.selectError);

  // Local UI state
  searchText = signal('');
  // selectedRole = signal<string | null>(null);
  // selectedStatus = signal<string | null>(null);
  displayDialog = signal(false);
  editingUser = signal<User | null>(null);
  userForm = signal<Partial<CreateUserRequest>>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: 'Active',
    phone: '',
    department: '',
  });

  roles = ['Admin', 'Manager', 'Fleet Manager', 'Operator', 'Viewer'];
  statuses = ['Active', 'Inactive', 'Pending'];
  departments = [
    'Operations',
    'Fleet Management',
    'Safety',
    'IT',
    'Administration',
  ];

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

    // // Role filter
    // if (this.selectedRole()) {
    //   result = result.filter((user) => user.role === this.selectedRole());
    // }

    // // Status filter
    // if (this.selectedStatus()) {
    //   result = result.filter((user) => user.status === this.selectedStatus());
    // }

    return result;
  });

  ngOnInit(): void {
    // Load users on component init
    this.store.dispatch(UsersActions.loadUsers());
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText.set(target.value);
  }

  onRoleFilterChange(role: string | null): void {
    // this.selectedRole.set(role);
  }

  onStatusFilterChange(status: string | null): void {
    // this.selectedStatus.set(status);
  }

  clearFilters(): void {
    this.searchText.set('');
    // this.selectedRole.set(null);
    // this.selectedStatus.set(null);
  }

  openNew(): void {
    this.editingUser.set(null);
    this.userForm.set({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      status: 'Active',
      phone: '',
      department: '',
    });
    this.displayDialog.set(true);
  }

  editUser(user: User): void {
    this.editingUser.set(user);
    this.userForm.set({
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
        // Toast will be shown automatically by toast.effects.ts
        this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
      },
    });
  }

  deleteSelectedUsers(): void {
    const selected = this.selectedUsers();
    if (selected.length === 0) {
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${selected.length} selected user(s)?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids = selected.map((u) => u.id);
        // Toast will be shown automatically by toast.effects.ts
        this.store.dispatch(UsersActions.deleteUsers({ ids }));
      },
    });
  }

  saveUser(): void {
    const form = this.userForm();
    console.log('form', form)
    const editing = this.editingUser();

    if (!form.firstName || !form.lastName || !form.email || !form.role) {
      console.log('add validation error')
      return;
    }

    if (editing) {
      // Update existing user - toast will be shown automatically by toast.effects.ts
      this.store.dispatch(
        UsersActions.updateUser({
          userData: {
            id: editing.id,
            ...form,
          },
        }),
      );
    } else {
      // Create new user - toast will be shown automatically by toast.effects.ts
      this.store.dispatch(
        UsersActions.createUser({
          userData: form as CreateUserRequest,
        }),
      );
    }

    this.displayDialog.set(false);
    this.editingUser.set(null);
  }

  onSelectionChange(users: User[]): void {
    this.store.dispatch(UsersActions.setSelectedUsers({ users }));
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Pending':
        return 'warning';
      default:
        return '';
    }
  }
}
