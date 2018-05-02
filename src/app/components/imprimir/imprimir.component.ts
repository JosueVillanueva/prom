import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html'
})
export class ImprimirComponent implements OnInit {

  spin:boolean=true;
  secciones:any;
  responsables:any;
  red:any;
  constructor(public h:HttpService) {
    setTimeout(()=>{
      this.h.getsecciones().subscribe((resp:any)=>{
        this.secciones = resp;
      });
      this.h.getresponsables("todos").subscribe((resp:any)=>{
        this.responsables = resp;
      });
      this.h.getrespred("todos").subscribe((resp:any)=>{
        this.red = resp;
      });
      this.spin = false;
    },3000);
  }

  imprimir(form:any){
    if(form.value.seccion!=""){
      if(form.value.responsable!=""){
        window.open("http://mapinfomich.com/Promovidos/imprimir.php?seccion="+form.value.seccion+"&responsable="+form.value.responsable);
      }else{
        window.open("http://mapinfomich.com/Promovidos/imprimir.php?seccion="+form.value.seccion);
      }
    }else{
      if(form.value.responsable!=""){
        window.open("http://mapinfomich.com/Promovidos/imprimir.php?responsable="+form.value.responsable);
      }else{
        window.open("http://mapinfomich.com/Promovidos/imprimir.php");
      }
    }

  }

  ngOnInit() {
  }

}
