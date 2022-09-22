import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { AngularMaterialModule } from 'src/app/angular-material.modules';
import { historyReducer } from 'src/app/store/history/history-reducer';
import { searchReducer } from 'src/app/store/search/search-reducer';

import { SortOrderByFormComponent } from './sort-order-by-form.component';

describe('SortOrderByFormComponent', () => {
  let component: SortOrderByFormComponent;
  let fixture: ComponentFixture<SortOrderByFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortOrderByFormComponent],
      imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          search: searchReducer,
          searchParamsHistory: historyReducer,
        }),
      ],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(SortOrderByFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
