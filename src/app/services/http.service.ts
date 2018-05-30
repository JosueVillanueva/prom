import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

  constructor(public http:HttpClient) { }

  getlogin(usuario:string, pass:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getLogin.php?user="+usuario+"&pass="+pass).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getsecciones(){
    return this.http.get("http://coplase.com.mx/Promovidos/getSecciones.php").map((respuesta:any)=>{
      return respuesta;
    });
  }
  getseccionesC(colonia:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getSeccionesC.php?colonia="+colonia).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getseccionescolonia(){
    return this.http.get("http://coplase.com.mx/Promovidos/getColonias.php").map((respuesta:any)=>{
      return respuesta;
    });
  }
  getColoniaS(seccion:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getColoniasS.php?seccion="+seccion).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getresponsables(cual:string,porque:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getResponsables.php?cual="+cual+"&why="+porque).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getrespred(cual:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getResponsablesRed.php?cual="+cual).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getpromovidos(cual:string,otro:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getPromovidos.php?cual="+cual+"&otro="+otro).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getusuarios(cual:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getUsuarios.php?cual="+cual).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getusuario(id:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getUsuariosN.php?cual="+id).map((respuesta:any)=>{
      return respuesta;
    });
  }
  eliminaruser(id:string){
    return this.http.get("http://coplase.com.mx/Promovidos/eliminarUser.php?id="+id).map((respuesta:any)=>{return respuesta});
  }
  setResponsables(form:any){
    let headersito= new HttpHeaders({
      'Content-Type': "image/jpeg",
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.post("http://coplase.com.mx/Promovidos/setResponsables.php",form,{headers:headersito}).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getEstadisticas(){
    return this.http.get("http://coplase.com.mx/Promovidos/getEstadisticas.php").map((respuesta:any)=>{
      return respuesta;
    });
  }
  getrespProm(cual:string){
    return this.http.get("http://coplase.com.mx/Promovidos/getRespProm.php?cual="+cual).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getCoord(calle:string,mun:string){
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD9nZzYt7v6D-LqdTflCQ9PUb9S9z7HkOQ&address="+calle+" "+mun, ).map((respuesta:any)=>{return respuesta});
  }
  eliminarprom(id:string){
    return this.http.get("http://coplase.com.mx/Promovidos/eliminarProm.php?id="+id).map((respuesta:any)=>{return respuesta});
  }
  eliminarresp(id:string){
    return this.http.get("http://coplase.com.mx/Promovidos/eliminarResp.php?id="+id).map((respuesta:any)=>{return respuesta});
  }
}
