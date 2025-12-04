import type { LookupData } from '../../../shared/services/lookup.service';

export interface LookupState {
  lookups: LookupData | null;
  loading: boolean;
  error: string | null;
}

export const initialLookupState: LookupState = {
  lookups: null,
  loading: false,
  error: null,
};

