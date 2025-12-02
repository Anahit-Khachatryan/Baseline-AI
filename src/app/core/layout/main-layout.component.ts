import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, Menu],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  items: MenuItem[] = [
    {
      label: 'REAL-TIME DATA',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-box',
        },
        {
          label: 'Drivers',
          icon: 'pi pi-box',
        },
        {
          label: 'Alerts Center',
          icon: 'pi pi-box',
        },
      ],
    },
    {
      label: 'HISTORICAL DATA ANALYTICS',
      items: [
        {
          label: 'Analytics Overview',
          icon: 'pi pi-box',
        },
      ],
    },
    {
      label: 'System & Support',
      items: [
        {
          label: 'User Management',
          icon: 'pi pi-box',
        },
        {
          label: 'Device Management',
          icon: 'pi pi-box',
        },
      ],
    },
  ];
}
