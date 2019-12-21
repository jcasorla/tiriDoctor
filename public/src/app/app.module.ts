import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core'; // <-- APP-INITIALIZER very import to preload data
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
import {AuthGuard} from '../app/auth.guard'; // <-- AuthGuard prevents page from loading if no valid session or token
import {PreloadProvider} from './preload';
import { AccountComponent } from './account/account.component';
import { ConsultaComponent } from './consulta/consulta.component' // <== preload data from preload.ts


export function preloadProviderFactory(provider: PreloadProvider) { // <== preload data from preload.ts
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
    AccountComponent,
    ConsultaComponent,    
  ],
  providers: [
    PreloadProvider, // <== preload data from preload.ts
    { provide: APP_INITIALIZER, useFactory: preloadProviderFactory, deps: [PreloadProvider], multi: true },
    HttpService,
    AuthGuard // <-- AuthGuard prevents page from loading if no valid session or token
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

