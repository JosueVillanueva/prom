import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterresp'
})
export class FilterRespPipe implements PipeTransform {
  transform(items: any[], searchTextresp: string): any[] {
    if(!items) return [];
    if(!searchTextresp) return items;
searchTextresp = searchTextresp.toLowerCase();
return items.filter( it => {
      let este = it.respred;
      return este.toLowerCase().includes(searchTextresp);
    });
   }
}
