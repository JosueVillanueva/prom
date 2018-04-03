import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  username:string;
  privileges:string;
  constructor(private route:Router) {
    if(!this.isAuthenticated()){
      this.route.navigate(['login']);
    }
  }

  ngOnInit() {
  }
  public setSession(user:any): void {
   // Set the time that the access token will expire at
   let token = Math.random().toString(36).substr(2);
   token = token + Math.random().toString(36).substr(2);
   this.privileges = user.Privilegios;
   this.username = user.Usuario;
   localStorage.setItem('access_token', token);
   localStorage.setItem('username', user.Usuario);
 }

 public isAuthenticated(): boolean {
   // Check whether the current time is past the
   // access token's expiry time
   if(localStorage.getItem('access_token')){
      return true;
    }else{
      return false;
    }
  }

}
