import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchParameters } from 'src/app/models/search-parameters';
import { search } from 'src/app/store/search/search-actions';
import {
  selectResults,
  selectSearchApiStatus,
} from 'src/app/store/search/search-selectors';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  data$: Observable<any>;
  constructor(private _store: Store) {
    this.data$ = this._store.pipe(select(selectResults));
    this.data$.subscribe((res) => console.log(res));
  }

  ngOnInit(): void {}

  onSearch(searchParams: SearchParameters): void {
    this._store.dispatch(
      search({
        searchParams,
      })
    );
  }
}
