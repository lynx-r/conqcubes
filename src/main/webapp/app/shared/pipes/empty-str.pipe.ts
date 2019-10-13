import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyStr'
})
export class EmptyStrPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      return value;
    }
    return args && args.length > 0 ? args[0] : '-';
  }
}
