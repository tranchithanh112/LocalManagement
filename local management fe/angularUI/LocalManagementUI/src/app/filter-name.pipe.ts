import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName',
})
export class FilterNamePipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any {
    return value.sort((a, b) => {
      let x = a.cityName.toLowerCase();
      let y = b.cityName.toLowerCase();
      if (x < y) {
        return -1;
      } else {
        return 1;
      }
      return 0;
    });
  }
}
