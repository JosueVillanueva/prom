import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';

declare var $:any;
@Component({
  selector: 'app-newresponsable',
  templateUrl: './newresponsable.component.html'
})
export class NewresponsableComponent implements OnInit {
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
  files:File;
  respuesta:string;
  constructor(public ht:HttpService) {
    setTimeout(()=>{

      this.spin = false;
    },1500);
  }
  readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.files = event.srcElement.files;
    console.log(this.files);
  }
}
uploadFile: any;
hasBaseDropZoneOver: boolean = false;
options: Object = {
  url: 'http://mapinfomich.com/Promovidos/imagenes'
};
sizeLimit = 2000000;

handleUpload(data): void {
  if (data && data.response) {
    data = JSON.parse(data.response);
    this.uploadFile = data;
  }
}

fileOverBase(e:any):void {
  this.hasBaseDropZoneOver = e;
}

beforeUpload(uploadingFile): void {
  if (uploadingFile.size > this.sizeLimit) {
    uploadingFile.setAbort();
    alert('File is too large');
  }
}
  ngOnInit() {
  }

  newresp(form:any){
    let data : {
      name: string;
      file: File;
    } = {
      name: "Name",
      file: this.files
      };
    //let forma = JSON.stringify([{'nombre': form.value.nombre},{'paterno':form.value.paterno},{'materno':form.value.materno},
    //{'sexo':form.value.sexo},{'direccion':form.value.direccion},{'telefono':form.value.telefono},{'correo':form.value.correo},
    //{'edad':form.value.edad},{'tipo':form.value.tipo},{'seccion':form.value.seccion},{this.files}]);
    //let forma = JSON.stringify(data);
    //console.log(forma);
    //form.append("imagen",this.files);
    console.log(form);
    this.ht.setResponsables(JSON.parse(form)).subscribe((resp:any)=>{
      this.respuesta = resp;
      console.log(this.respuesta);
    });
  }

}
