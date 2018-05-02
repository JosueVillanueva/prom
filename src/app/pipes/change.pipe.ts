import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'change'
})
export class ChangePipe implements PipeTransform {
  transform(value: string): string {
    switch(value){
      case '0': return "Capturista";
      case '1': return "Super Usuario";
      case '2': return "Administrador";
    }
  }
}
