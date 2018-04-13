import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ChartModule,Chart} from 'angular-highcharts';
declare var $:any;
@Component({
  selector: 'app-promovidos',
  templateUrl: './promovidos.component.html'
})
export class PromovidosComponent implements OnInit {

  responsables:any="";
  pages:any[]=[];
  spin:boolean=true;
  curPage : number=1;
  pageSize : number=10;
  direccion:string;
  sexo:string;
  edad:string;
  telefono:string;
  correo:string;
  seccion:string;
  face:string;
  twit:string;
  namefind:string;
  elector:string;
  nac:string;
  celular:string;
  origen:string;
  observaciones:string;
  errormapa:boolean;
  lat:string;
  lng:string;
  m:any=[{
    'name': '',
    'y': '',
    'drilldown': ''
  }];
  chart = new Chart({
    chart: {
            type: 'column'
        },
        title: {
            text: 'Tabla de resultados de acuerdo a la prioridad'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total de demandas recibidas'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
        },

        series: [{
        }],
  });
  constructor(public http:HttpService){
    this.http.getpromovidos("todos").subscribe((resp:any)=>{
      this.responsables = resp;
      this.m = resp;
      this.pages=this.numberOfPages();
    });
    setTimeout(()=>{
      let i;
      console.log(this.m.length);
      for(i=0;i<this.m.length;i=i+1){
        this.chart.addSerie({name:'Promovidos',data:[{name:this.m[i].nombre,y:parseInt(this.m[i].seccion)}]},true,true);
      }
      this.spin = false;
    },3000);
  }
  setinfo(todo:any){
    this.direccion=todo.calle+" "+todo.exterior+" "+todo.colonia;
    this.edad=todo.edad;
    this.elector=todo.elector;
    this.nac=todo.nac;
    this.seccion=todo.seccion;
    this.telefono=todo.telefono;
    this.celular=todo.celular;
    this.correo=todo.correo;
    this.face=todo.face;
    this.twit=todo.twit;
    this.origen=todo.origen;
    this.observaciones=todo.observaciones;

  }
  showmodal(name:string,todo:any){
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
