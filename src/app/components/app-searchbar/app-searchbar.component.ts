import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { faSearch, faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbar',
  templateUrl: './app-searchbar.component.html',
  styleUrls: ['./app-searchbar.component.scss']
})
export class AppSearchbarComponent implements OnInit {

  @Input() initialDate?: Date;

  @Output() submitFn: EventEmitter<any> = new EventEmitter();
  @Output() refreshFn: EventEmitter<any> = new EventEmitter();

  faSearch = faSearch;
  faRedo = faRedo;

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    const date = this.datePipe.transform(
      this.initialDate || new Date(), 'yyyy-MM-dd',
    );

    const [year, month, day] = date.split('-').map(Number);

    const formattedDate = this.datePipe.transform(
      new Date(year, month - 1, day), 'yyyy-MM-dd',
    );

    this.searchForm = this.formBuilder.group({
      date: [formattedDate, Validators.required],
    });
  }

  handleSubmitSearchForm(): void {
    if (this.searchForm.invalid) return;

    const { date } = this.searchForm.getRawValue()
    this.submitFn.emit(date);
  }
}
