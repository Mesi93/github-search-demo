import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SearchParameters } from 'src/app/models/search-parameters';
import { SearchIndexService } from 'src/app/service/search-index.service';
import { selectHistorySearchList } from 'src/app/store/history/history-selectors';

@Component({
  selector: 'app-search-history-list',
  templateUrl: './search-history-list.component.html',
  styleUrls: ['./search-history-list.component.scss'],
})
export class SearchHistoryListComponent implements OnDestroy {
  searchParamsHistory$!: Observable<SearchParameters[]>;
  searchParamsHistory: SearchParameters[] = [];
  unsubscribe = new Subject<void>();
  constructor(
    private _store: Store,
    private readonly searchIndexService: SearchIndexService
  ) {
    this.searchParamsHistory$ = this._store.select(selectHistorySearchList);
    this.searchParamsHistory$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: SearchParameters[]) => {
        if (res && res.length) {
          this.searchParamsHistory = res;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectSearch(index: number): void {
    this.searchIndexService.setSearchIndex(index);
  }
}
