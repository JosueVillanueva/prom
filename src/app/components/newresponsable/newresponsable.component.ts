import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newresponsable',
  templateUrl: './newresponsable.component.html'
})
export class NewresponsableComponent implements OnInit {
  spin:boolean=true;
  constructor() {
    setTimeout(()=>{

      this.spin = false;
    },1500);
  }

  ngOnInit() {
  }

}
