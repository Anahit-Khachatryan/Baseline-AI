import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Menu } from 'primeng/menu';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { appMenuFeature } from '../../core/store/features/app.feature';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, Menu],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private store = inject(Store);
  
  items = this.store.selectSignal(appMenuFeature.selectMenuItems);
}
