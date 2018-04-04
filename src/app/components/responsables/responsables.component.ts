import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
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
  constructor(public http:HttpService){
    setTimeout(()=>{
      this.http.getresponsables("todos").subscribe((resp:any)=>{
        this.responsables = resp;
        this.pages=this.numberOfPages();
      });
      this.spin = false;
    },1500);
  }
  setinfo(todo:any){
    this.direccion=todo.direccion;
    this.sexo=todo.sexo;
    this.edad=todo.edad;
    this.telefono=todo.telefono;
    this.email=todo.email;
    this.seccion=todo.seccion;
    this.tipo=todo.ocupacion;
    this.imagen=todo.imagen;
  }
  showmodal(name:string,todo:any){
    this.namefind = name;
    this.http.getCoord(todo.direccion,"Morelia").subscribe((resp:any)=>{
      console.log(resp.results[0]);
      if(!resp.results[0]){
        this.errormapa=true;
      }else{
        this.errormapa=false;
      }
      this.lat=resp.results[0].geometry.location.lat;
      this.lng=resp.results[0].geometry.location.lng;
    });
    this.setinfo(todo);
    $('#myModal').modal('show');
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

  ngOnInit() {
  }

}