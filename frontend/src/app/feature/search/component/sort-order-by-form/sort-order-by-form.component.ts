import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sort-order-by-form',
  templateUrl: './sort-order-by-form.component.html',
  styleUrls: ['./sort-order-by-form.component.scss'],
})
export class SortOrderByFormComponent implements OnInit, OnDestroy {
  sortAndOrderByForm!: FormGroup;
  unsubscribe = new Subject<void>();
  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    this.sortAndOrderByForm.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.onSearchEvent.emit(this.sortAndOrderByForm.value);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  createForm(): void {
    this.sortAndOrderByForm = new FormGroup({
      sortBy: new FormControl('default'),
      orderBy: new FormControl('desc'),
    });
  }
}
