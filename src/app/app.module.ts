import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

import { HomePage } from './pages/home/home.page';
import { DetailsPage } from './pages/details/details.page';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSearchbarComponent } from './components/app-searchbar/app-searchbar.component';

@NgModule({
  declarations: [
    HomePage,
    DetailsPage,

    AppComponent,
    AppHeaderComponent,
    AppSearchbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ChartsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
