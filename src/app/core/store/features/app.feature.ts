import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from '../features.enum';
import { initialAppState } from '../states/app.state';
import { AppActions } from '../actions/app.actions';

export const appReducer = createReducer(
  initialAppState,
  immerOn(AppActions.setMenuItems, (state, { menuItems }) => {
    state.menuItems = menuItems;
  }),
);

export const appMenuFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
  extraSelectors: ({ selectMenuItems }) => ({
    selectMenuItems,
  }),
});
