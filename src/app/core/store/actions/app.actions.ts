import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { MenuItem } from 'primeng/api';

export const AppActions = createActionGroup({
  source: '[App]',
  events: {
    'App init': emptyProps(),
    'Load menu items': emptyProps(),
    'Set menu items': props<{ menuItems: MenuItem[] }>(),
  },
});
