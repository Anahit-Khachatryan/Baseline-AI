import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { LookupData } from '../../../shared/services/lookup.service';

export const LookupActions = createActionGroup({
  source: '[Lookup]',
  events: {
    'Load lookups': emptyProps(),
    'Load lookups success': props<{ lookups: LookupData }>(),
    'Load lookups failure': props<{ error: string }>(),
  },
});

