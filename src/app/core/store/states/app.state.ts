import type { MenuItem } from 'primeng/api';

export interface AppState {
  menuItems: MenuItem[];
}

export const initialAppState: AppState = {
  menuItems: [],
};
