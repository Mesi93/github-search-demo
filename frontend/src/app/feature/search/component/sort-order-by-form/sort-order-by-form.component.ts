import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sort-order-by-form',
  templateUrl: './sort-order-by-form.component.html',
  styleUrls: ['./sort-order-by-form.component.scss'],
})
export class SortOrderByFormComponent implements OnInit {
  sortAndOrderByForm!: FormGroup;
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    this.sortAndOrderByForm.valueChanges.subscribe(() => {
      this.onSearchEvent.emit(this.sortAndOrderByForm.value);
    });
  }

  createForm(): void {
    this.sortAndOrderByForm = new FormGroup({
      sortBy: new FormControl('default'),
      orderBy: new FormControl('desc'),
    });
  }
}
