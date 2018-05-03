import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import { Location } from '@angular/common';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

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
  otro:boolean = false;
  resp:string;
  respe:string;
  error:boolean;
  mensajer:string;
  priv:string;
  edit:boolean = false;
  user:any;
  spin2:boolean = false;
  id:string;
  constructor(public http:HttpService,private location: Location,public httpsend:HttpClient,private route:Router){
    if(!this.isAuthenticated()){
      this.route.navigate(['login']);
    }
    if(localStorage.getItem('type')!='1'){
      this.route.navigate(['home']);
    }
    this.priv = localStorage.getItem('type')
    setTimeout(()=>{
      this.http.getusuarios(this.priv).subscribe((resp:any)=>{
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
   editus(id:string){
     this.spin2 = true;
     this.http.getusuario(id).subscribe((resp:any)=>{
       this.user = resp;
       console.log(this.user);
       this.id = this.user[0].id;
     });
     setTimeout(()=>{
       this.edit = true;
       this.spin2 = false;
     },3000);

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
  eliminar(id:string){
    const confirmed = window.confirm('¿Seguro que deseas eliminar este usuario?');
      if (confirmed) {
        setTimeout(()=>{
          this.http.eliminaruser(id).subscribe((resp:any)=>{
            console.log(resp);
          });
          location.reload();
        },1500);
      }

  }
  agregar(){
    this.otro = true;
  }
  cancelar(){
    this.otro = false;
  }
  cancelar2(){
    this.user = null;
    this.edit = false;
  }
  guardar(form:any){
    this.spin = true;
    const fd = new FormData();
    fd.append('nombre',form.value.nombre);
    fd.append('usuario',form.value.usuario);
    fd.append('pass',form.value.pass);
    fd.append('tipo',form.value.tipo);
    setTimeout(()=>{
      this.httpsend.post("http://mapinfomich.com/Promovidos/setUsuarios.php",fd).subscribe((respuesta:any)=>{
        this.resp = respuesta;
        console.log(respuesta);
      });
      setTimeout(()=>{
        if(this.resp=="correcto"){
          alert("Se ha agregado correctamente!");
          location.reload();
        }else{
          this.error = true;
          this.mensajer = "Hubo un error al momento de subir la información. Ya lo estamos revisando...";
        }
        this.spin = false;
      },500);
    },2000);
  }
  editar(form:any){
    this.spin = true;
    const fd = new FormData();
    fd.append('nombre',form.value.nombre);
    fd.append('usuario',form.value.usuario);
    fd.append('pass',form.value.pass);
    fd.append('tipo',form.value.tipo);
    fd.append('id',this.id);
    setTimeout(()=>{
      this.httpsend.post("http://mapinfomich.com/Promovidos/setEditUsuarios.php",fd).subscribe((respuesta:any)=>{
        this.respe = respuesta;
        console.log(respuesta);
      });
      setTimeout(()=>{
        if(this.respe=="correcto"){
          alert("Se ha editado correctamente!");
          location.reload();
        }else{
          this.error = true;
          this.mensajer = "Hubo un error al momento de subir la información. Ya lo estamos revisando...";
        }
        this.spin = false;
      },500);
    },2000);
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
