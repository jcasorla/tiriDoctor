import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListPatComponent } from './list-pat/list-pat.component';
import { NewPatComponent } from './new-pat/new-pat.component';
import {ViewPatComponent} from './view-pat/view-pat.component'
import { EditPatComponent } from './edit-pat/edit-pat.component';
import { RefreshComponent } from './refresh/refresh.component';


const routes: Routes = [
{ path: 'app/home',component: HomeComponent },
{ path: 'refresh',component: RefreshComponent },
{ path: 'app/list',component: ListPatComponent },
  { path: 'app/new-pat',component: NewPatComponent },
  // use a colon and parameter name to include a parameter in the url
  { path: 'app/edit/:id', component: EditPatComponent },
  { path: 'app/view/:id', component: ViewPatComponent },
  { path: 'app', pathMatch: 'full', redirectTo: 'app/home' },
  
 
//   // the ** will catch anything that did not match any of the above routes
  // { path: '**', component: PageNotFoundComponent }

];

@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
