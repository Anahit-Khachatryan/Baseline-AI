import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  sections: SidebarSection[] = [
    {
      title: 'REAL-TIME DATA',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-th-large',
          route: '/dashboard',
        },
        {
          label: 'Drivers',
          icon: 'pi pi-users',
          route: '/drivers',
        },
        {
          label: 'Alerts Center',
          icon: 'pi pi-bell',
          route: '/alerts',
        },
      ],
    },
    {
      title: 'HISTORICAL DATA ANALYTICS',
      items: [
        {
          label: 'Analytics Overview',
          icon: 'pi pi-chart-bar',
          route: '/analytics',
        },
      ],
    },
    {
      title: 'SYSTEM & SUPPORT',
      items: [
        {
          label: 'User Management',
          icon: 'pi pi-user-edit',
          route: '/admin/users',
        },
        {
          label: 'Device Management',
          icon: 'pi pi-desktop',
          route: '/admin/devices',
        },
      ],
    },
  ];
}

