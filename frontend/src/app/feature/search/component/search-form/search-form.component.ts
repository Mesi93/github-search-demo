import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  searchForm!: FormGroup;
  searchFormAdvanced!: FormGroup;
  checkboxError: boolean = false;
  languages: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  topics!: string[];
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  @Output() onResetEvent: EventEmitter<any> = new EventEmitter();
  constructor(private readonly formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.searchForm = this.formBuilder.group({
      searchBy: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      byName: new FormControl(false),
      byDescription: new FormControl(false),
      byReadme: new FormControl(false),
    });

    this.searchFormAdvanced = new FormGroup({
      userName: new FormControl(''),
      organization: new FormControl(''),
      languages: new FormControl([]),
      topics: new FormControl([]),
    });
  }

  checkCheckboxError() {
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

  addTopic() {}

  addLanguage() {}

  onSearch(): void {
    this.checkCheckboxError();
    if (this.searchForm.valid && !this.checkboxError) {
      console.log(this.searchForm.value);
      const forms = [this.searchForm.value, this.searchFormAdvanced.value];
      this.onSearchEvent.emit(Object.assign({}, ...forms));
    }
  }

  onReset(): void {
    this.searchForm.reset();
    this.searchFormAdvanced.reset();
    this.onResetEvent.emit();
  }
}
