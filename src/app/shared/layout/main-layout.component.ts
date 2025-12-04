import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, Menu],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  items: MenuItem[] = [
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
          routerLink: '/admin/devices'
        },
      ],
    },
  ];
}
