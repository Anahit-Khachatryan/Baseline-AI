import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DriversComponent } from './features/drivers/drivers.component';
import { AlertsComponent } from './features/alerts/alerts.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { UsersComponent } from './features/admin/users/users.component';
import { DevicesComponent } from './features/admin/devices/devices.component';
import { MainLayoutComponent } from './shared/layout/main-layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'admin/users', component: UsersComponent },
      { path: 'admin/devices', component: DevicesComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: '' },
];
