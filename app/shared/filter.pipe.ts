import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:Product[],filterString:string): Product[] {
    filterString=filterString?filterString.toLocaleLowerCase():""

    return filterString?value.filter((p:Product)=>p.name.toLocaleLowerCase().indexOf(filterString)!==-1):value;
  }

}
