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
import { NewresponsableComponent } from './components/newresponsable/newresponsable.component';
import { ChartModule } from 'angular-highcharts';
import { EditpromComponent } from './components/editprom/editprom.component';
import {PasswordPipe} from './pipes/password.pipe';
import {ChangePipe} from './pipes/change.pipe';
import { ImprimirComponent } from './components/imprimir/imprimir.component';
import { EditrespComponent } from './components/editresp/editresp.component';

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
    NewresponsableComponent,
    EditpromComponent,
    PasswordPipe,
    ChangePipe,
    ImprimirComponent,
    EditrespComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHrEclbeTPI_e9XHupK7dXxoq9P_apj48'
    }),
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
