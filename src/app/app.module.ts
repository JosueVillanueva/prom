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
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    PromovidosComponent,
    PromoverComponent,
    UsuariosComponent,
    ResponsablesComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
