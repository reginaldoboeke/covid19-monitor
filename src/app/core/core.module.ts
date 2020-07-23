import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrConfig } from 'ngx-toastr';

import { AppHeaderComponent } from './components/app-header/app-header.component';

const toastrConfig: Partial<ToastrConfig> = {
  progressBar: true,
  timeOut: 2500,
};

@NgModule({
  declarations: [
    AppHeaderComponent,
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(toastrConfig),
  ],
  exports: [
    AppHeaderComponent,
  ]
})
export class CoreModule { }
