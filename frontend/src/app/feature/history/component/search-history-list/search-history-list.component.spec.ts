import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryListComponent } from './search-history-list.component';

describe('SearchHistoryListComponent', () => {
  let component: SearchHistoryListComponent;
  let fixture: ComponentFixture<SearchHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHistoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
