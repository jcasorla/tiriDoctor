import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListPatComponent } from './list-pat/list-pat.component';
import { NewPatComponent } from './new-pat/new-pat.component';
import {ViewPatComponent} from './view-pat/view-pat.component'
import { EditPatComponent } from './edit-pat/edit-pat.component';
import { RefreshComponent } from './refresh/refresh.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
{ path: 'app/home',component: HomeComponent, canActivate: [AuthGuard]},
{ path: 'refresh',component: RefreshComponent },
{ path: 'app/list',component: ListPatComponent, canActivate: [AuthGuard]},
  { path: 'app/new-pat',component: NewPatComponent, canActivate: [AuthGuard]},
  // use a colon and parameter name to include a parameter in the url
  { path: 'app/edit/:id', component: EditPatComponent, canActivate: [AuthGuard]},
  { path: 'app/view/:id', component: ViewPatComponent, canActivate: [AuthGuard]},
  { path: 'app', pathMatch: 'full', redirectTo: 'app/home' },
  { path: '', pathMatch: 'full', redirectTo: 'app/home' },
  
 
//   // the ** will catch anything that did not match any of the above routes
  // { path: '**', component: PageNotFoundComponent }

];

@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
