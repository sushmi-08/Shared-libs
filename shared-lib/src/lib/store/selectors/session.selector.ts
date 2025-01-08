import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SessionState } from '../reducers/session.reducer';

export const sessionSelector = createFeatureSelector<SessionState>('session')
export const selectToken = createSelector(sessionSelector, (state: SessionState) => state.token);
