import { Component, Input } from '@angular/core';
import { Service } from '../models/service.model';
import { estimateUSDPipe } from '../pipes/estimateUSD.pipe';
import { ServiceTableComponent } from '../service-table/service-table.component';
 
@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent {
 
  ngOnInit(): void {
    
  }
 
  @Input('services')
  services!:Service[]
  @Input('upfront')
  upfront!:number
  @Input('monthly')
  monthly!:number
  @Input('annual')
  annual!:number
 

}