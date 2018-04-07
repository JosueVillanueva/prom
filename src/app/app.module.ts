import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpService} from './services/http.service';
import { AppComponent } from './app.component';
import {app_routing} from './app.routes';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { PromovidosComponent } from './components/promovidos/promovidos.component';
import { PromoverComponent } from './components/promover/promover.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ResponsablesComponent } from './components/responsables/responsables.component';
import { AgmCoreModule } from '@agm/core';
import { Ng2UploaderModule } from 'ng2-uploader';
import { NewresponsableComponent } from './components/newresponsable/newresponsable.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    PromovidosComponent,
    PromoverComponent,
    UsuariosComponent,
    ResponsablesComponent,
    NewresponsableComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    Ng2UploaderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHrEclbeTPI_e9XHupK7dXxoq9P_apj48'
    }),
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
