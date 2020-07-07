import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule, GlobalConfig as ToastrConfig } from 'ngx-toastr';

import { HomePage } from './pages/home/home.page';
import { DetailsPage } from './pages/details/details.page';

import localeBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSearchbarComponent } from './components/app-searchbar/app-searchbar.component';

registerLocaleData(localeBr, 'pt');

const toastrConfig: Partial<ToastrConfig> = {
  progressBar: true,
  timeOut: 2500,
};

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
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrConfig),
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
