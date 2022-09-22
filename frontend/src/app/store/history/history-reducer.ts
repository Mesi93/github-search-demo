import { createReducer, on } from '@ngrx/store';
import { addRepoHistory, addSearchParamsHistory } from './history-actions';

export interface HistoryState {
  searchHistoryParamsList: any;
  searchHistoryRepoList: any;
}

export const initialState: HistoryState = {
  searchHistoryParamsList: [],
  searchHistoryRepoList: [],
};

export const historyReducer = createReducer(
  initialState,
  on(addSearchParamsHistory, (state, { searchParams }) => ({
    ...state,
    searchHistoryParamsList: [...state.searchHistoryParamsList, searchParams],
  })),
  on(addRepoHistory, (state, { githubRepo }) => ({
    ...state,
    searchHistoryRepoList: [...state.searchHistoryRepoList, githubRepo],
  }))
);
