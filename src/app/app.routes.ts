import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {PromoverComponent} from './components/promover/promover.component';
import {PromovidosComponent} from './components/promovidos/promovidos.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'promovidos', component: PromovidosComponent },
  { path: 'promover', component: PromoverComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent },
  { path:'**', pathMatch:'full', redirectTo:'home'}
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);
