import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { faSearch, faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbar',
  templateUrl: './app-searchbar.component.html',
  styleUrls: ['./app-searchbar.component.scss']
})
export class AppSearchbarComponent implements OnInit {

  faSearch = faSearch;
  faRedo = faRedo;

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    const date = new Date();
    const dateFormatted = this.datePipe.transform(date, 'yyyy-MM-dd');

    this.searchForm = this.formBuilder.group({
      date: [dateFormatted, Validators.required],
    });
  }

  ngOnInit(): void { }

  async handleSubmitSearchForm(): Promise<void> {
    if (this.searchForm.invalid) return;

    console.log('form submited', this.searchForm.getRawValue());
  }
}
