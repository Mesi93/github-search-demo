import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  @ViewChild('languageInput') languageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  @Output() onResetEvent: EventEmitter<any> = new EventEmitter();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchForm!: FormGroup;
  searchFormAdvanced!: FormGroup;
  checkboxError: boolean = false;
  allLanguages: string[] = [
    'JavaScript',
    'TypeScript',
    'C++',
    'C#',
    'Java',
    'Python',
    'Swift',
    'PHP',
  ];
  languages: string[] = [];
  filteredLanguages$: Observable<string[]>;
  allTopics: string[] = ['Github', 'Interview'];
  topics: string[] = [];
  filteredTopics$: Observable<string[]>;
  constructor() {
    this.createForm();
    this.filteredLanguages$ = this.searchFormAdvanced.controls[
      'languages'
    ].valueChanges.pipe(
      startWith(null),
      map((language: string | null) =>
        language ? this._filterLanguage(language) : this.allLanguages.slice()
      )
    );
    this.filteredTopics$ = this.searchFormAdvanced.controls[
      'topics'
    ].valueChanges.pipe(
      startWith(null),
      map((topics: string | null) =>
        topics ? this._filterTopic(topics) : this.allTopics.slice()
      )
    );
  }

  createForm(): void {
    this.searchForm = new FormGroup({
      searchBy: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      byName: new FormControl(false),
      byDescription: new FormControl(false),
      byReadme: new FormControl(false),
    });

    this.searchFormAdvanced = new FormGroup({
      userName: new FormControl('', Validators.minLength(3)),
      organization: new FormControl('', Validators.minLength(3)),
      languages: new FormControl(''),
      topics: new FormControl(''),
      starsBy: new FormControl(''),
      sizeBy: new FormControl(''),
      createdBy: new FormControl(''),
      stars: new FormControl(''),
      starsStart: new FormControl(''),
      starsEnd: new FormControl(''),
      size: new FormControl(''),
      sizeStart: new FormControl(''),
      sizeEnd: new FormControl(''),
      created: new FormControl(''),
      createdStart: new FormControl(''),
      createdEnd: new FormControl(''),
    });
  }

  validateCheckbox(): void {
    if (
      this.searchForm.controls['byName'].value === true ||
      this.searchForm.controls['byDescription'].value === true ||
      this.searchForm.controls['byReadme'].value === true
    ) {
      this.checkboxError = false;
    } else {
      this.checkboxError = true;
    }
  }

  onSearch(): void {
    this.validateCheckbox();
    if (this.searchForm.valid && !this.checkboxError) {
      const forms = [this.searchForm.value, this.searchFormAdvanced.value];
      this.onSearchEvent.emit(forms);
    }
  }

  onReset(): void {
    this.searchForm.reset();
    this.searchFormAdvanced.reset();
    this.onResetEvent.emit();
  }

  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.languages.push(value);
      this.searchFormAdvanced.controls['languages'].setValue(this.languages);
    }
    event.chipInput!.clear();
    this.searchFormAdvanced.controls['languages'].setValue(null);
  }

  removeLanguage(language: string): void {
    const index = this.languages.indexOf(language);
    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

  languageSelected(event: MatAutocompleteSelectedEvent): void {
    this.languages.push(event.option.viewValue);
    this.languageInput.nativeElement.value = '';
  }

  addTopic(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.topics.push(value);
      this.searchFormAdvanced.controls['topics'].setValue(this.topics);
    }
    event.chipInput!.clear();
    this.searchFormAdvanced.controls['topics'].setValue(null);
  }

  removeTopic(topic: string): void {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  topicSelected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    this.topicInput.nativeElement.value = '';
  }

  private _filterLanguage(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLanguages.filter((language) =>
      language.toLowerCase().includes(filterValue)
    );
  }

  private _filterTopic(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTopics.filter((topic) =>
      topic.toLowerCase().includes(filterValue)
    );
  }
}
