import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import { Features } from '../features.enum';
import { initialLookupState } from '../states/lookup.state';
import { LookupActions } from '../actions/lookup.actions';

export const lookupReducer = createReducer(
  initialLookupState,
  immerOn(LookupActions.loadLookups, (state) => {
    state.loading = true;
    state.error = null;
  }),
  immerOn(LookupActions.loadLookupsSuccess, (state, { lookups }) => {
    state.lookups = lookups;
    state.loading = false;
    state.error = null;
  }),
  immerOn(LookupActions.loadLookupsFailure, (state, { error }) => {
    state.loading = false;
    state.error = error;
  }),
);

export const lookupFeature = createFeature({
  name: Features.Lookup,
  reducer: lookupReducer,
  extraSelectors: ({ selectLookups, selectLoading, selectError }) => ({
    selectLookups,
    selectLoading,
    selectError,
    selectRoles: createSelector(selectLookups, (lookups) => lookups?.roles ?? []),
    selectStatuses: createSelector(selectLookups, (lookups) => lookups?.statuses ?? []),
    selectDepartments: createSelector(selectLookups, (lookups) => lookups?.departments ?? []),
    selectCountryCodes: createSelector(selectLookups, (lookups) => lookups?.countryCodes ?? []),
  }),
});

