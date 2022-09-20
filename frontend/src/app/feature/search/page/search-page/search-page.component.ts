import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchParameters } from 'src/app/models/search-parameters';
import { search } from 'src/app/store/search/search-actions';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  searchForm!: FormGroup;
  constructor(private _store: Store) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.searchForm = new FormGroup({
      searchBy: new FormControl(''),
      byName: new FormControl(false),
      byDescription: new FormControl(false),
      byReadme: new FormControl(false),
    });
  }

  onSearch() {
    console.log(this.searchForm.value);
    const searchParams: SearchParameters = this.searchForm.getRawValue();
    this._store.dispatch(
      search({
        searchParams,
      })
    );
  }

  onReset() {}
}
