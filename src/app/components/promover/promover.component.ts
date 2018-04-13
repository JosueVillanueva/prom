import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-promover',
  templateUrl: './promover.component.html'
})
export class PromoverComponent implements OnInit {
  secciones:any;
  spin:boolean=true;
  seccionales:any = {
    'Municipal': '',
    'Distrital': '',
    'Seccional': ''
  };
  resp:string;
  error:boolean;
  mensajer:string;
  success:boolean;
  mensajes:string;
  constructor(public h:HttpService,public http:HttpClient) {
    setTimeout(()=>{
    this.h.getsecciones().subscribe((resp:any)=>{
      this.secciones = resp;
    });
      this.spin = false;
    },1500);
  }

  elegirR(valor:string){
    this.h.getrespProm(valor).subscribe((respuesta:any)=>{
      this.seccionales = respuesta;
    });

  }

  newprom(form:any){
    this.spin=true;
    const fd = new FormData();
    fd.append('nombre',form.value.nombre);
    fd.append('paterno',form.value.paterno);
    fd.append('materno',form.value.materno);
    fd.append('sexo',form.value.sexo);
    fd.append('calle',form.value.calle);
    fd.append('int',form.value.interior);
    fd.append('ext',form.value.exterior);
    fd.append('colonia',form.value.colonia);
    fd.append('edad',form.value.edad);
    fd.append('elector',form.value.elector);
    fd.append('nac',form.value.nac);
    fd.append('seccion',form.value.seccion);
    fd.append('tel',form.value.telefono);
    fd.append('celular',form.value.celular);
    fd.append('correo',form.value.correo);
    fd.append('face',form.value.face);
    fd.append('twit',form.value.twit);
    fd.append('respmun',form.value.respmun);
    fd.append('respdis',form.value.respdis);
    fd.append('respsec',form.value.respsec);
    fd.append('origen',form.value.origen);
    fd.append('observaciones',form.value.observaciones);
    setTimeout(()=>{
      this.http.post("http://mapinfomich.com/Promovidos/setPromovido.php",fd).subscribe((respuesta:any)=>{
        this.resp = respuesta;
        console.log(respuesta);
      });
      setTimeout(()=>{
        if(this.resp=="incorrecto"){
          this.error = true;
          this.mensajer = "Hubo un error al momento de subir la información. Ya lo estamos revisando...";
        }else{
          this.success = true;
          this.mensajes = "Se ha subido correctamente el responsable...";
        }
        this.spin = false;
      },500);
    },2000);
  }

  ngOnInit() {
  }

}
