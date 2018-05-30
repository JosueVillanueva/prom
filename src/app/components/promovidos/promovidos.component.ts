import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ChartModule,Chart} from 'angular-highcharts';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-promovidos',
  templateUrl: './promovidos.component.html',
})
export class PromovidosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
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
  priv:string;
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
            text: 'Hombres y mujeres promovidos en Morelia'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total de Hombres/Mujeres'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{y}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> del total<br/>'
        },

        series: [{
        }],
  });
  chartpie = new Chart({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Promovidos por edades'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y}',
                style: {
                    color: ''
                }
            }
        }
    },
    series: []
  });
  respred:any;
  responsablesdos:any;
  usuariopequeno:string;
  constructor(public http:HttpService, private r:Router,private location: Location){
    this.priv = localStorage.getItem('type');
    this.usuariopequeno = localStorage.getItem('username');
    if(this.priv=="0"){
      this.http.getpromovidos(localStorage.getItem('id'),"noeditar").subscribe((resp:any)=>{
        this.responsables = resp;
        this.pages=this.numberOfPages();
      });
      setTimeout(()=>{
        this.spin = false;
      },5000);
    }else{
      this.http.getresponsables("todos","nuevo").subscribe((resp:any)=>{
        this.responsablesdos = resp;
      });
      this.http.getrespred("todos").subscribe((resp:any)=>{
        this.respred = resp;
      });
      this.http.getpromovidos("todos","noeditar").subscribe((resp:any)=>{
        this.responsables = resp;
        this.pages=this.numberOfPages();
      });
      this.http.getEstadisticas().subscribe((resp:any)=>{
        this.m = resp;
      });
      setTimeout(()=>{
        let i;
        console.log(this.m);
        for(i=0;i<this.m.barras.length;i=i+1){
          this.chart.addSerie({name:'Promovidos',data:[{name:this.m.barras[i].sexo,y:parseInt(this.m.barras[i].total)}]},true,true);
        }
        i = 0;
        if(this.m.pastel.length>0){
          this.chartpie.addSerie({name:'Promovidos',data:[{name:'[0-20]',y:parseInt(this.m.pastel[i].veinte),sliced: false,selected:false},{name:'[21-25]',y:parseInt(this.m.pastel[i].veinticinco)},{name:'[26-30]',y:parseInt(this.m.pastel[i].treinta)},{name:'[>30]',y:parseInt(this.m.pastel[i].mastreinta)}]});

        }
        this.spin = false;
      },5000);
    }
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
  showmodal(id:string,todo:any){
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

    setTimeout(()=>{
      var opciones="titlebar=no, toolbar=no, location=no,  directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=750, height=520, top=110, left=100";
      window.open("http://coplase.com.mx/Promovidos/info_prom.php?id="+id+"&lat="+this.lat+"&long="+this.lng,"",opciones);
    },1000);
  }
  elegirresp(cual:string){
    this.http.getpromovidos(cual,"responsable").subscribe((resp:any)=>{
      this.responsables = resp;
      console.log(this.responsables);
    });
  }
  eliminar(id:string){
    const confirmed = window.confirm('¿Seguro que deseas eliminar este promovido?');
      if (confirmed) {
        setTimeout(()=>{
          this.http.eliminarprom(id).subscribe((resp:any)=>{
            console.log(resp);
          });
          location.reload();
        },1500);
      }

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

    this.dtOptions = {
      language: {
        "emptyTable": "No hay información",
        "info": "",
        "infoEmpty": "",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "<a class='page-link' aria-label='Previous'><span aria-hidden='true'>&raquo;</span><span class='sr-only'>Previous</span></a>",
            "previous": "<a class='page-link' aria-label='Previous'><span aria-hidden='true'>&laquo;</span><span class='sr-only'>Previous</span></a>"
        }
    },
    pageLength: 10
    };
  }

}
