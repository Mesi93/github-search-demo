import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { AngularMaterialModule } from 'src/app/angular-material.modules';
import { historyReducer } from 'src/app/store/history/history-reducer';
import { searchReducer } from 'src/app/store/search/search-reducer';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      imports: [
        AngularMaterialModule,
        DatePipe,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          search: searchReducer,
          searchParamsHistory: historyReducer,
        }),
      ],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get githubdata', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    let githubData = [
      {
        name: 'test',
        full_name: 'test',
        html_url: 'test',
        owner: {
          login: 'test',
          avatar_url: 'test',
          html_url: 'test',
        },
        created_at: new Date(),
        updated_at: new Date(),
        language: 'test',
        description: 'test',
        forks: 2323,
        stargazers_count: 2323,
        open_issues_count: 2323,
        watchers: 2323,
      },
    ];
    component.setDataSource(githubData);
    fixture.detectChanges();
    const nameColumn = hostElement.querySelector('#name-column');
    expect(nameColumn?.innerHTML).toBe(' test ');
  });
});
