import { createFeature, createReducer } from '@ngrx/store';

import { Features } from '../features.enum';
import { initialAppState } from '../states/app.state';

export const appReducer = createReducer(
  initialAppState,
);

export const appGlobalFeature = createFeature({
  name: Features.App,
  reducer: appReducer,
});
