import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { GithubApiService } from 'src/app/service/github.service';
import { search, searchError, searchSuccess } from './search-actions';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private githubApiService: GithubApiService
  ) {}

  loadSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap((action) =>
        this.githubApiService.getRepositories(action.searchParams).pipe(
          map((results) => searchSuccess({ results: results })),
          catchError((err) => of(searchError(err))),
          tap(() => {
            console.log('search finished');
          })
        )
      )
    )
  );
}
