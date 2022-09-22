import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchParameters } from 'src/app/models/search-parameters';
import { selectHistorySearchList } from 'src/app/store/history/history-selectors';

@Component({
  selector: 'app-search-history-list',
  templateUrl: './search-history-list.component.html',
  styleUrls: ['./search-history-list.component.scss'],
})
export class SearchHistoryListComponent implements OnInit {
  searchParamsHistory$!: Observable<SearchParameters[]>;
  searchParamsHistory: SearchParameters[] = [];
  constructor(private _store: Store) {
    this.searchParamsHistory$ = this._store.select(selectHistorySearchList);
    this.searchParamsHistory$.subscribe((res: SearchParameters[]) => {
      if (res) {
        console.log('HISTORY', res);
        this.searchParamsHistory = res;
      }
    });
  }

  ngOnInit(): void {}

  selectSearch(params: SearchParameters) {
    console.log('ID', params.searchId);
  }
}
