import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GithubRepo } from 'src/app/feature/search/component/search-result/search-result.component';
import { HistoryState } from './history-reducer';

const selectHistoryState = createFeatureSelector<HistoryState>(
  'searchParamsHistory'
);

export const selectHistorySearchList = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.searchHistoryParamsList
);

export const selectHistoryRepoList = (index: number) =>
  createSelector(selectHistoryState, (state: HistoryState) => {
    if (state) {
      return state.searchHistoryRepoList[index];
    }
  });
