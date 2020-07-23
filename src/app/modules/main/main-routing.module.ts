import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.page';
import { DetailsPage } from './pages/details/details.page';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'details', component: DetailsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
