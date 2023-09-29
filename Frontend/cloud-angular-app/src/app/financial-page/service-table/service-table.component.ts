import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service.model';
import { AwsCatalogService } from 'src/app/aws-catalog/service/aws-catalog.service';


@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.css']
})
export class ServiceTableComponent implements OnInit {
  totalUpfrontCost: number = 0;
  totalMonthlyCost: number = 0;
  totalAnnualCost: number = 0;


  searchTerm: string = '';
  services: Service[] = [];


  constructor(private awsCatalogService: AwsCatalogService) { } // Injecting AwsCatalogService


  ngOnInit(): void {
    const awsProducts = this.awsCatalogService.getCart();
    this.services = awsProducts.map(product => { 

      const upfront = product.pricing?.upfront || 0;
      const monthly = product.pricing?.monthly || 0;
      const annual = product.pricing?.annual || 0;
      
      this.totalUpfrontCost += upfront;
      this.totalMonthlyCost += monthly;
      this.totalAnnualCost += annual;

      return {
      name: product.name || "Unnamed Product", 
      upfrontCost: `$${product.pricing?.upfront.toFixed(2) || 0} USD`, 
      monthlyCost: `$${product.pricing?.monthly.toFixed(2) || 0} USD`,
      annualCost: `$${product.pricing?.annual.toFixed(2) || 0} USD`
    };
});

  }
}


