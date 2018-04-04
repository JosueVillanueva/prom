import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-promover',
  templateUrl: './promover.component.html'
})
export class PromoverComponent implements OnInit {
  secciones:any;
  spin:boolean=true;
  constructor(public h:HttpService) {
    setTimeout(()=>{
    this.h.getsecciones().subscribe((resp:any)=>{
      this.secciones = resp;
    });
      this.spin = false;
    },1500);
  }

  ngOnInit() {
  }

}
