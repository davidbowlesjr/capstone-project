import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'estimateUSD'
})
export class estimateUSDPipe implements PipeTransform {
 
  transform(val:number): string {
    let preVal=val.toFixed(2)
    let sVal:string=preVal.toLocaleString()
    if(sVal.includes('.')){
        return sVal+' USD'
    }
    else{
        return sVal+'.00 USD'
    }
}
 
}
 