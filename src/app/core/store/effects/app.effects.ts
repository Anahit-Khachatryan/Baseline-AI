import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.actions';
import { AppActions } from '../actions/app.actions';
import { inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import type { MenuItem } from 'primeng/api';

const getMenuItems = (): MenuItem[] => [
  {
    label: 'REAL-TIME DATA',
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-plus',
        routerLink: '/dashboard',
      },
      {
        label: 'Drivers',
        icon: 'pi pi-search',
        routerLink: '/drivers',
      },
      {
        label: 'Alerts Center',
        icon: 'pi pi-search',
        routerLink: '/alerts',
      },
    ],
  },
  {
    label: 'HISTORICAL DATA ANALYTICS',
    items: [
      {
        label: 'Analytics Overview',
        icon: 'pi pi-stop',
        routerLink: '/analytics',
      },
    ],
  },
  {
    label: 'SYSTEM & SUPPORT',
    items: [
      {
        label: 'User Management',
        icon: 'pi pi-stop',
        routerLink: '/admin/users',
      },
      {
        label: 'Device Management',
        icon: 'pi pi-stop',
        routerLink: '/admin/devices',
      },
    ],
  },
];

export const applicationInit$ = createEffect(
  (actions = inject(Actions), localStorageService = inject(LocalStorageService)) => {
    return actions.pipe(
      ofType(AppActions.appInit),
      switchMap(() => {
        const token = localStorageService.get('token') ?? '';
        return [
          AuthActions.setToken({ token }),
          AppActions.loadMenuItems(),
        ];
      }),
    );
  },
  { functional: true },
);

export const loadMenuItems = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(AppActions.loadMenuItems),
      map(() => {
        const menuItems = getMenuItems();
        return AppActions.setMenuItems({ menuItems });
      }),
    );
  },
  { functional: true },
);
