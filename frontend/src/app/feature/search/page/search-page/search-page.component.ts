import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiStatus } from 'src/app/models/api-status.enum';
import { SearchParameters } from 'src/app/models/search-parameters';
import { addSearchParamsHistory } from 'src/app/store/history/history-actions';
import { search } from 'src/app/store/search/search-actions';
import { selectSearchApiStatus } from 'src/app/store/search/search-selectors';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  searchApiStatus$: Observable<ApiStatus>;
  loaded: boolean = false;
  apiError: boolean = false;
  searchForms: any;
  searchParams!: SearchParameters;

  constructor(private _store: Store) {
    this.searchApiStatus$ = this._store.select(selectSearchApiStatus);
    this.searchApiStatus$.subscribe((res: ApiStatus) => {
      if (res === ApiStatus.Loaded) {
        this.loaded = true;
      }
      if (res === ApiStatus.Error) {
        this.apiError = true;
      } else {
        this.apiError = false;
      }
    });
  }

  onSortOrOrderBy(searchParams: FormGroup): void {
    this.searchParams = { ...this.searchParams, ...searchParams };
    this.onSearch();
  }

  onSearchBy(forms: any): void {
    this.searchForms = forms;
    this.searchParams = Object.assign({}, ...this.searchForms);
    this.searchParams = Object.assign({}, this.searchParams, {
      searchId: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
    });

    console.log('searchParams', this.searchParams);
    this.onSearch();
  }

  onSearch(): void {
    this._store.dispatch(
      search({
        searchParams: this.searchParams,
      })
    );
    this._store.dispatch(
      addSearchParamsHistory({
        searchParams: this.searchParams,
      })
    );
  }

  onReset(): void {
    this.loaded = false;
  }
}
