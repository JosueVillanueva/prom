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
  result:string;
  constructor(private r:Router,public h:HomeComponent, public ht:HttpService) {
    if(localStorage.getItem('access_token')){
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
     }
  }

  logear(form:any){
    this.spin=true;
    this.ht.getlogin(form.value.user,form.value.password).subscribe((resp:any)=>{
      console.log(resp);
      this.result = resp;
      console.log(this.result);
    });
    setTimeout(()=>{
      if(this.result=="correcto"){
        setTimeout(()=>{
          this.r.navigate(['/home']);
        },3000);
      }else{
        setTimeout(()=>{ this.elerror=true; this.spin=false;}, 3000);
      }
    },2000);
  }
}
