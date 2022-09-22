import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SearchIndexService {
  private searchIndexSource = new BehaviorSubject<number>(0);
  searchIndex$ = this.searchIndexSource.asObservable();

  setSearchIndex(value: number): void {
    this.searchIndexSource.next(value);
  }
}
