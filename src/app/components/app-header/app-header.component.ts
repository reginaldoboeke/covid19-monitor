import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  @Input() height: number = 80;
  @Input() showGoBackButton: boolean = false;

  constructor(private location: Location) { }

  ngOnInit(): void { }

  handleGoBack(): void {
    this.location.back();
  }
}
