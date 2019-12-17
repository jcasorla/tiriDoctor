import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NewPatComponent } from './new-pat/new-pat.component';
import { NoPatologicosComponent } from './no-patologicos/no-patologicos.component';
import { ViewPatComponent } from './view-pat/view-pat.component';
import { EditPatComponent } from './edit-pat/edit-pat.component';
import { ListPatComponent } from './list-pat/list-pat.component';
import { ActualComponent } from './actual/actual.component';
import { FamiliarComponent } from './familiar/familiar.component';
import { PatologicoComponent } from './patologico/patologico.component';
import { FisicoComponent } from './fisico/fisico.component';
import { GinecoComponent } from './gineco/gineco.component';
import { RefreshComponent } from './refresh/refresh.component';
import { ProblemasComponent } from './problemas/problemas.component';
import {AuthGuard} from '../app/auth.guard';
import {PreloadProvider} from './preload'


// import { CakeComponent } from './cake/cake.component'; // <-- import FormsModule.

export function preloadProviderFactory(provider: PreloadProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewPatComponent,
    NoPatologicosComponent,
    ViewPatComponent,
    EditPatComponent,
    ListPatComponent,
    ActualComponent,
    FamiliarComponent,
    PatologicoComponent,
    FisicoComponent,
    GinecoComponent,
    RefreshComponent,
    ProblemasComponent,    
  ],
  providers: [
    PreloadProvider, 
    { provide: APP_INITIALIZER, useFactory: preloadProviderFactory, deps: [PreloadProvider], multi: true },
    HttpService,
    AuthGuard
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- register FormsModule with our app.
    HttpClientModule,
    AppRoutingModule
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }

