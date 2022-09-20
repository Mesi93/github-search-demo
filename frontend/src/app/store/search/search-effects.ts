import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { GithubRepository } from 'src/app/feature/repositories/github.repository';

import { search, searchError, searchSuccess } from './search-actions';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private githubRepository: GithubRepository
  ) {}

  loadSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap((action) =>
        // this.githubRepository.getGithubStuff(action.searchParams)
        of().pipe(
          map((results) => searchSuccess(results)),
          catchError((err) => of(searchError()))
        )
      )
    )
  );
}
