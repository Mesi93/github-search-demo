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

export const selectHistoryRepoListById = (id: string) =>
  createSelector(selectHistoryState, (state: HistoryState) => {
    if (state) {
      return state.searchHistoryRepoList.find((item: GithubRepo) => {
        return item.searchId === id;
      });
    } else {
      return [];
    }
  });
