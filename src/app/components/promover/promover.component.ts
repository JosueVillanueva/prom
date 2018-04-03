import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-promover',
  templateUrl: './promover.component.html'
})
export class PromoverComponent implements OnInit {
  secciones:any;
  constructor(public h:HttpService) {
    this.h.getsecciones().subscribe((resp:any)=>{
      this.secciones = resp;
    });
  }

  ngOnInit() {
  }

}
