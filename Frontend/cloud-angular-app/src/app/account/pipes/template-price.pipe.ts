import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'pricing'})
export class PriceTransformPipe implements PipeTransform {
    transform(price: number, cadence: string) {
        if (cadence == 'monthly') {
            return price / 100
        } else if (cadence == 'annual') {
            return price * 12 / 100
        } else {
            return 0
        }
    }

}