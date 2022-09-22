import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AngularMaterialModule } from 'src/app/angular-material.modules';
import { historyReducer } from 'src/app/store/history/history-reducer';
import { searchReducer } from 'src/app/store/search/search-reducer';

import { SearchHistoryListComponent } from './search-history-list.component';

describe('SearchHistoryListComponent', () => {
  let component: SearchHistoryListComponent;
  let fixture: ComponentFixture<SearchHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHistoryListComponent],
      imports: [
        AngularMaterialModule,
        DatePipe,
        StoreModule.forRoot({
          search: searchReducer,
          searchParamsHistory: historyReducer,
        }),
      ],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
