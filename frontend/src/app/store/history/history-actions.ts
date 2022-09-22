import { createAction, props } from '@ngrx/store';
import { GithubRepo } from 'src/app/feature/search/component/search-result/search-result.component';
import { SearchParameters } from 'src/app/models/search-parameters';

export const addSearchParamsHistory = createAction(
  '[History] addSearchHistory',
  props<{ searchParams: SearchParameters }>()
);

export const addRepoHistory = createAction(
  '[History] addRepoHistory',
  props<{ githubRepo: GithubRepo[] }>()
);
