import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

import { MainRoutingModule } from './main-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomePage } from './pages/home/home.page';
import { DetailsPage } from './pages/details/details.page';

import { AppSearchbarComponent } from './components/app-searchbar/app-searchbar.component';

@NgModule({
  declarations: [
    HomePage,
    DetailsPage,
    AppSearchbarComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ChartsModule,
    CoreModule,
    SharedModule,
  ]
})
export class MainModule { }
