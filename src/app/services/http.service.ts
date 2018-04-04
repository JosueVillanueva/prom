import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

  constructor(public http:HttpClient) { }

  getlogin(usuario:string, pass:string){
    return this.http.get("http://mapinfomich.com/Promovidos/getLogin.php?user="+usuario+"&pass="+pass).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getsecciones(){
    return this.http.get("http://mapinfomich.com/Promovidos/getSecciones.php").map((respuesta:any)=>{
      return respuesta;
    });
  }
  getresponsables(cual:string){
    return this.http.get("http://mapinfomich.com/Promovidos/getResponsables.php?cual="+cual).map((respuesta:any)=>{
      return respuesta;
    });
  }
  getCoord(calle:string,mun:string){
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD9nZzYt7v6D-LqdTflCQ9PUb9S9z7HkOQ&address="+calle+" "+mun, ).map((respuesta:any)=>{return respuesta});
  }
}
