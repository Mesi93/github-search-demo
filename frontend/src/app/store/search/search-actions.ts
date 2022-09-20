import { createAction, props } from '@ngrx/store';
import { GithubApiResults } from 'src/app/models/github-api-results';
import { SearchParameters } from 'src/app/models/search-parameters';

export const search = createAction(
  '[Search] Search',
  props<{ searchParams: SearchParameters }>()
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ results: GithubApiResults[] }>()
);

export const searchError = createAction('[Search] Search Error');
