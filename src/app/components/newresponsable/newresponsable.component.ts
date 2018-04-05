import { Component, OnInit } from '@angular/core';

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
  constructor() {
    setTimeout(()=>{

      this.spin = false;
    },1500);
  }

  ngOnInit() {
  }

  newresp(form:any){
    console.log(form);
  }

}
