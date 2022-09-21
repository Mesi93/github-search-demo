import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiStatus } from './models/api-status.enum';
import { selectSearchApiStatus } from './store/search/search-selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  searchApiStatus$!: Observable<ApiStatus>;
  isLoading: boolean = false;

  constructor(private _store: Store) {
    this.searchApiStatus$ = this._store.select(selectSearchApiStatus);
    this.searchApiStatus$.subscribe((res: ApiStatus) => {
      if (res && res === ApiStatus.Loading) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });
  }
}
