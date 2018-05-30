import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editresp',
  templateUrl: './editresp.component.html'
})
export class EditrespComponent implements OnInit {

  spin:boolean=true;
  units = [
        {'id': 'Municipal', 'label': 'Municipal'},
        {'id': 'Distrital', 'label': 'Distrital'},
        {'id': 'Seccional', 'label': 'Seccional'},
    ];
  sexos = [
    {'id':'Hombre', 'texto':'Masculino'},
    {'id':'Mujer', 'texto':'Femenino'}
  ];
  url="../../assets/img/responsables/nousuario.jpg";
  files:File=null;
  selectedFiles:File=null;
  respimagen:string;
  error:boolean=false;
  mensajer:string;
  respbd:string;
  success:boolean;
  mensajes:string;
  resp:any= {
    'nombre': '',
    'paterno': '',
    'materno': ''
  };
  id:string;
  constructor(public ht:HttpService,private route:Router,active:ActivatedRoute, public http:HttpClient,private location: Location){
    this.resp[0] = {
      'nombre': '',
      'paterno':'',
      'materno':'',
      'edad':'',
      'sexo':'',
      'direccion':'',
      'telefono':'',
      'email':'',
      'seccion':'',
      'tipo':'',
      'imagen':''
    }
    if(!this.isAuthenticated()){
      this.route.navigate(['login']);
    }
    if(localStorage.getItem('type')=='0'){
      this.route.navigate(['home']);
    }
    setTimeout(()=>{
    active.params.subscribe((params:any)=>{
      this.id = params['id'];
    });
    this.ht.getresponsables(this.id,"editar").subscribe((resp:any)=>{
      console.log(resp);
      this.resp = resp;
    });
    setTimeout(()=>{
      let im = this.resp[0].imagen.split(".");
      console.log(im);
      if(im[1]!=""){
        this.url = "http://mapinfomich.com/Promovidos/imagenes/resp/"+this.resp[0].imagen;
      }
    },1500);
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
  readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.files = event.srcElement.files;
    this.selectedFiles = <File>event.target.files[0];
  }
}

  ngOnInit() {
  }

  newresp(form:any){
    this.spin = true;
    if(this.selectedFiles!=null){
      const image = new FormData();
      image.append('nombre',form.value.nombre+" "+form.value.paterno+" "+form.value.materno);
      image.append('image',this.selectedFiles,this.selectedFiles.name);
      this.http.post("http://coplase.com.mx/Promovidos/imageResp.php",image).subscribe((respuesta:any)=>{
        this.respimagen = respuesta;
        console.log("mandado: "+respuesta);
      });
      if(this.respimagen=='error'){
        this.error = true;
        this.mensajer = "Hubo un error al momento de subir la imagen. Ya lo estamos revisando...";
        return
      }
    }else{
      this.respimagen = "no";
    }

    const fd = new FormData();
    fd.append('nombre',form.value.nombre);
    fd.append('paterno',form.value.paterno);
    fd.append('materno',form.value.materno);
    fd.append('edad',form.value.edad);
    fd.append('sexo',form.value.sexo);
    fd.append('direccion',form.value.direccion);
    fd.append('telefono',form.value.telefono);
    fd.append('correo',form.value.correo);
    fd.append('seccion',form.value.seccion);
    fd.append('tipo',form.value.tipo);
    fd.append('id',this.id);
    setTimeout(()=>{
      console.log("respuesta img: "+this.respimagen);
      if(this.respimagen == "correcto"){
        fd.append('siimagen',"true");
        let x = this.selectedFiles.name.split(".");
        console.log(x);
        fd.append('ext',x[1]);
      }else{
        fd.append('siimagen',"false");
      }
      this.http.post("http://coplase.com.mx/Promovidos/setEditResponsables.php",fd).subscribe((respuesta:any)=>{
        this.respbd = respuesta;
      });
      setTimeout(()=>{
        if(this.respbd=="incorrecto"){
          this.error = true;
          this.mensajer = "Hubo un error al momento de subir la información. Ya lo estamos revisando...";
        }else{
          this.success = true;
          this.mensajes = "Se ha editado correctamente el responsable...";
        }
        location.reload();
        this.spin = false;
      },500);
    },2000);
  }
}
