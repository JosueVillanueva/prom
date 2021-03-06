import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.component.html'
})
export class ResponsablesComponent implements OnInit {
  responsables:any="";
  pages:any[]=[];
  spin:boolean=true;
  curPage : number=1;
  pageSize : number=10;
  direccion:string;
  sexo:string;
  edad:string;
  telefono:string;
  email:string;
  seccion:string;
  tipo:string;
  imagen:string;
  namefind:string;
  errormapa:boolean;
  lat:string;
  lng:string;
  priv:string;
  constructor(public http:HttpService,private route:Router){
    this.priv = localStorage.getItem('type');
    if(!this.isAuthenticated()){
      this.route.navigate(['login']);
    }
    if(localStorage.getItem('type')=='0'){
      this.route.navigate(['home']);
    }
    setTimeout(()=>{
      this.http.getresponsables("todos","todos").subscribe((resp:any)=>{
        this.responsables = resp;
        this.pages=this.numberOfPages();
      });
      this.spin = false;
    },1500);
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
  setinfo(todo:any){
    this.direccion=todo.direccion;
    this.sexo=todo.sexo;
    this.edad=todo.edad;
    this.telefono=todo.telefono;
    this.email=todo.email;
    this.seccion=todo.seccion;
    this.tipo=todo.tipo;
    this.imagen=todo.imagen;
  }
  showmodal(id:string,todo:any){
    this.namefind = name;

      this.http.getCoord(todo.calle+" "+todo.exterior+" "+todo.colonia,"Morelia").subscribe((resp:any)=>{
        console.log(resp.results[0]);
        if(!resp.results[0]){
          this.errormapa=true;
        }else{
          this.errormapa=false;
        }
        this.lat=resp.results[0].geometry.location.lat;
        this.lng=resp.results[0].geometry.location.lng;
      });

    setTimeout(()=>{
      var opciones="titlebar=no, toolbar=no, location=no,  directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=750, height=520, top=110, left=100";
      window.open("http://coplase.com.mx/Promovidos/info_resp.php?id="+id+"&lat="+this.lat+"&long="+this.lng,"",opciones);
    },1000);
  }
  numberOfPages(){
    let arraysito=[];
    let i:number=1,j:number=0;
    let pagesf:number = Math.ceil(this.responsables.length / this.pageSize);
    while(i<=pagesf){
      arraysito[j]=i;
      i=i+1;
      j=j+1;
    }
    return arraysito;
  }
  eliminar(id:string){
    const confirmed = window.confirm('¿Seguro que deseas eliminar este responsable?');
      if (confirmed) {
        setTimeout(()=>{
          this.http.eliminarresp(id).subscribe((resp:any)=>{
          });
          location.reload();
        },2000);
      }

  }
  ngOnInit() {
  }

}
