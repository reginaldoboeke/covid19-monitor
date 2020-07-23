import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { faSearch, faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbar',
  templateUrl: './app-searchbar.component.html',
  styleUrls: ['./app-searchbar.component.scss']
})
export class AppSearchbarComponent implements OnInit {

  @Input() public initialDate?: Date;

  @Output() public submitFn: EventEmitter<any> = new EventEmitter();
  @Output() public refreshFn: EventEmitter<any> = new EventEmitter();

  public faSearch = faSearch;
  public faRedo = faRedo;

  public searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,
  ) { }

  public ngOnInit(): void {
    const date = this.datePipe.transform(
      this.initialDate || new Date(), 'yyyy-MM-dd',
    );

    console.log('initial date', this.initialDate)

    const [year, month, day] = date.split('-').map(Number);

    const formattedDate = this.datePipe.transform(
      new Date(year, month - 1, day), 'yyyy-MM-dd',
    );

    this.searchForm = this.formBuilder.group({
      date: [formattedDate, Validators.required],
    });
  }

  public handleSubmitSearchForm(): void {
    if (this.searchForm.invalid) {
      this.toastr.error(null, 'Date is required.');
      return;
    }

    const { date } = this.searchForm.getRawValue()
    this.submitFn.emit(date);
  }

  public get date() {
    return this.searchForm.get('date');
  }
}
