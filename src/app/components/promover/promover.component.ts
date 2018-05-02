import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';

declare var $:any;
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
  errorin:string;
  errorvac:string;
  errorot:string;
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
  cambiarf(c:any){
    $("#"+c.name).attr('class','form-control valid ng-touched');
    $("#err"+c.name).attr('class',"invalid-feedback");
    $("#err"+c.name+"ot").attr('class',"invalid-feedback");
    this.errorin = "";
    this.errorvac = "";
    this.errorot = "";
  }
  newprom(form:any){
    console.log(form);
    this.spin=true;
    var valor = $("#nombre").val();
    if(valor==""){
      this.errorin = "nombre";
      this.errorvac = "nombre";
      this.spin = false;
      return;
    }
    let expreg = new RegExp("[A-Za-z\s]+$");
    if(!expreg.test(valor)){
      this.errorin = "nombre";
      this.errorot = "nombre";
      this.spin = false;
      return;
    }
    valor = $("#paterno").val();
    if(valor==""){
      this.errorin = "paterno";
      this.errorvac = "paterno";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "paterno";
      this.errorot = "paterno";
      this.spin = false;
      return;
    }
    valor = $("#materno").val();
    if(valor==""){
      this.errorin = "materno";
      this.errorvac = "materno";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "materno";
      this.errorot = "materno";
      this.spin = false;
      return;
    }
    valor = $("#sexo").val();
    if(valor=="0" || valor == null){
      this.errorin = "sexo";
      this.errorvac = "sexo";
      this.spin = false;
      return;
    }
    valor = $("#calle").val();
    if(valor==""){
      this.errorin = "calle";
      this.errorvac = "calle";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "calle";
      this.errorot = "calle";
      this.spin = false;
      return;
    }
    valor = $("#interior").val();
    expreg = new RegExp("^[0-9]*$");
    if(!expreg.test(valor)){
      this.errorin = "interior";
      this.errorot = "interior";
      this.spin = false;
      return;
    }
    valor = $("#exterior").val();
    if(valor==""){
      this.errorin = "exterior";
      this.errorvac = "exterior";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "exterior";
      this.errorot = "exterior";
      this.spin = false;
      return;
    }
    valor = $("#colonia").val();
    expreg = new RegExp("[A-Za-z\s.-]+$");
    if(valor==""){
      this.errorin = "colonia";
      this.errorvac = "colonia";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "colonia";
      this.errorot = "colonia";
      this.spin = false;
      return;
    }
    valor = $("#edad").val();
    expreg = new RegExp("^[0-9]*$");
    if(valor==""){
      this.errorin = "edad";
      this.errorvac = "edad";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "edad";
      this.errorot = "edad";
      this.spin = false;
      return;
    }
    valor = $("#seccion").val();
    if(valor=="0" || valor == null){
      this.errorin = "seccion";
      this.errorvac = "seccion";
      this.spin = false;
      return;
    }
    valor = $("#telefono").val();
    expreg = new RegExp("^[0-9]*$");
    if(!expreg.test(valor)){
      this.errorin = "telefono";
      this.errorot = "telefono";
      this.spin = false;
      return;
    }
    valor = $("#celular").val();
    expreg = new RegExp("^[0-9]*$");
    if(!expreg.test(valor)){
      this.errorin = "celular";
      this.errorot = "celular";
      this.spin = false;
      return;
    }
    valor = $("#correo").val();
    expreg = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
    if(!expreg.test(valor)){
      this.errorin = "correo";
      this.errorot = "correo";
      this.spin = false;
      return;
    }
    var valor = $("#municipal").val();
    if(valor==""){
      this.errorin = "municipal";
      this.errorvac = "municipal";
      this.spin = false;
      return;
    }
    expreg = new RegExp("[A-Za-z\s]+$");
    if(!expreg.test(valor)){
      this.errorin = "municipal";
      this.errorot = "municipal";
      this.spin = false;
      return;
    }
    var valor = $("#distrital").val();
    if(valor==""){
      this.errorin = "distrital";
      this.errorvac = "distrital";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "distrital";
      this.errorot = "distrital";
      this.spin = false;
      return;
    }
    var valor = $("#seccional").val();
    if(valor==""){
      this.errorin = "seccional";
      this.errorvac = "seccional";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "seccional";
      this.errorot = "seccional";
      this.spin = false;
      return;
    }
    var valor = $("#red").val();
    if(valor==""){
      this.errorin = "red";
      this.errorvac = "red";
      this.spin = false;
      return;
    }
    if(!expreg.test(valor)){
      this.errorin = "red";
      this.errorot = "red";
      this.spin = false;
      return;
    }
    let fecha = new Date();
    let fechita = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate();
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
    fd.append('ocupacion',"");
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
    fd.append('respdis',form.value.respdis);
    fd.append('respred',form.value.respred);
    fd.append('iduser',localStorage.getItem('id'));
    fd.append('fecha',fechita);
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
          this.mensajes = "Se ha subido correctamente el promovido...";
        }
        this.spin = false;
      },500);
    },2000);
  }

  ngOnInit() {
  }

}
