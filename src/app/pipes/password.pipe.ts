import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {
  transform(value: String, permiso:String): String {
    switch(permiso){
      case '2':
      case '0': let salida = "";
                for(let i = 0;i<value.length;i++){
                  salida += "*";
                }
                return salida;
      case '1': return value;
    }

  }
}
