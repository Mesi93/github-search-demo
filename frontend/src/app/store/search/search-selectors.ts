import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search-reducer';

const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchApiStatus = createSelector(
    selectSearchState,
  (state: SearchState) => state.apiStatus
);

export const selectResults = createSelector(
    selectSearchState,
  (state: SearchState) => state.results
);
