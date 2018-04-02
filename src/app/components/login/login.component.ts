import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers:[HomeComponent]
})
export class LoginComponent{
  pass = "quinta2018";
  elerror:boolean=false;
  spin:boolean=false;
  constructor(private r:Router,public h:HomeComponent) {
    if(localStorage.getItem('access_token')){
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
     }
  }

  logear(form:any){
    this.spin=true;
    console.log(this.spin);
    if(form.value.password==this.pass){
      setTimeout(()=>{
        this.h.setSession();
        this.r.navigate(['/home']);
      },3000);
    }else{
      setTimeout(()=>{ this.elerror=true; this.spin=false;}, 3000);
    }
  }
}
