import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortOrderByFormComponent } from './sort-order-by-form.component';

describe('SortOrderByFormComponent', () => {
  let component: SortOrderByFormComponent;
  let fixture: ComponentFixture<SortOrderByFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortOrderByFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortOrderByFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
