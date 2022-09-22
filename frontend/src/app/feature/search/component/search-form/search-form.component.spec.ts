import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/angular-material.modules';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkbox validation works well', () => {
    component.searchForm.controls['byName'].setValue(true);
    component.searchForm.controls['byDescription'].setValue(false);
    component.searchForm.controls['byReadme'].setValue(false);
    component.validateCheckbox();
    expect(component.checkboxError).toBe(false);
    component.searchForm.controls['byName'].setValue(false);
    component.validateCheckbox();
    expect(component.checkboxError).toBe(true);
  });

  it('reset inputs', () => {
    component.onReset();
    expect(component.searchForm.controls['searchBy'].value).toBe(null);
    expect(component.searchFormAdvanced.controls['userName'].value).toBe(null);
  });
});
