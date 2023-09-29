import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VpcCloudFormationService } from './cloudformation.service';
import { VpcProduct } from './vpc.model';
import { AwsCatalogService } from '../service/aws-catalog.service';

@Component({
  selector: 'app-vpc',
  templateUrl: './vpc.component.html',
  styleUrls: ['./vpc.component.css']
})
export class VpcComponent {

  constructor(public catalogService: AwsCatalogService,
              private cfService: VpcCloudFormationService) { }

  vpcForm = new FormGroup({
    networkRange : new FormControl('', [
      Validators.required
    ]),
    numSiteToSiteVpns : new FormControl('', [
      Validators.required
    ]),
    avgDurationSiteToSiteVpns : new FormControl('', [
      Validators.required
    ]),
    avgDurationSiteToSiteVpnsUnits : new FormControl('', [
      Validators.required
    ]),
    numSubnets : new FormControl('', [
      Validators.required
    ]),
    numActiveVpns : new FormControl('', [
      Validators.required
    ]),
    numActiveVpnsUnits : new FormControl('', [
      Validators.required
    ]),
    avgActiveVpnsDuration : new FormControl('', [
      Validators.required
    ]),
    avgActiveVpnsDurationUnits : new FormControl('', [
      Validators.required
    ]),
    numWorkingDays : new FormControl('', [
      Validators.required
    ])
  })

  get networkRange() {
    return this.vpcForm.get('networkRange')
  }

  get numSiteToSiteVpns() {
    return this.vpcForm.get('numSiteToSiteVpns')
  }

  get avgDurationSiteToSiteVpns() {
    return this.vpcForm.get('avgDurationSiteToSiteVpns')
  }

  get avgDurationSiteToSiteVpnsUnits() {
    return this.vpcForm.get('avgDurationSiteToSiteVpnsUnits')
  }

  get numSubnets() {
    return this.vpcForm.get('numSubnets')
  }

  get numActiveVpns() {
    return this.vpcForm.get('numActiveVpns')
  }

  get numActiveVpnsUnits() {
    return this.vpcForm.get('numActiveVpnsUnits')
  }

  get avgActiveVpnsDuration() {
    return this.vpcForm.get('avgActiveVpnsDuration')
  }

  get avgActiveVpnsDurationUnits() {
    return this.vpcForm.get('avgActiveVpnsDurationUnits')
  }

  get numWorkingDays() {
    return this.vpcForm.get('numWorkingDays')
  }

  onSubmit() {
    const cfTemplate = this.cfService.generateTemplate(this.vpcForm)
    const monthlyCost: number = this.calcMonthlyCost()

    let vpcProduct: VpcProduct = {
      name: "VPC",
      id: 0,
      cloudFormation: cfTemplate,
      cost: {
        siteToSite: {
          numVpns: parseInt(this.numSiteToSiteVpns!.value?.toString() || ""),
          avgDuration: parseInt(this.avgDurationSiteToSiteVpns!.value?.toString() || ""),
          avgDurationUnits: this.avgDurationSiteToSiteVpnsUnits!.value?.toString() || ""
        },
        client: {
          numSubnets: parseInt(this.numSubnets!.value?.toString() || ""),
          numActiveVpns: parseInt(this.numActiveVpns!.value?.toString() || ""),
          avgDuration: parseInt(this.avgActiveVpnsDuration!.value?.toString() || ""),
          avgDurationUnits: this.avgActiveVpnsDurationUnits!.value?.toString() || "",
          numWorkingDays: parseInt(this.numWorkingDays!.value?.toString() || "")
        }
      },
      pricing: {
        upfront: 0, // there is no associated upfront costs with Amazon VPC
        monthly: monthlyCost,
        annual: monthlyCost * 12
      }
    }
    console.log(vpcProduct)
    this.catalogService.add(vpcProduct)
  }

  // hard coded implementation for pricing of Amazon VPC
  calcMonthlyCost(): number {
    let total: number = this.calcSiteToSiteCosts() + this.calcClientCosts()
    return Math.round(total * 100) / 100
  }

  calcSiteToSiteCosts(): number {
    // site to site cost = (# VPNs) * 0.05 USD * (# hours per month)
    let numVpns: number = parseInt(this.numSiteToSiteVpns!.value?.toString() || "")
    let hours: number = parseInt(this.avgDurationSiteToSiteVpns!.value?.toString() || "")
    let units: string = this.avgDurationSiteToSiteVpnsUnits!.value?.toString() || ""
    let hoursPerMonth: number = 0;
    
    switch (units) {
      case "day":
        hoursPerMonth = hours * (730 / 24) // (730 hours in a month / 24 hours in a day)
        break;

      case "week":
        hoursPerMonth = hours * (730 / 168) // (730 hours in a month / 168 hours in a week)
        break;

      case "month":
        hoursPerMonth = hours
        break;
    
      default:
        break;
    }

    return numVpns * 0.05 * hoursPerMonth
  }

  calcClientCosts(): number {
    // client costs: endpoint cost + connection cost
    let numSubnets: number = parseInt(this.numSubnets!.value?.toString() || "")
    let numVpns: number = parseInt(this.numActiveVpns!.value?.toString() || "")
    let hours: number = parseInt(this.avgActiveVpnsDuration!.value?.toString() || "")
    let hoursUnits: string = this.avgActiveVpnsDurationUnits!.value?.toString() || ""
    let numWorkingDays: number = parseInt(this.numWorkingDays!.value?.toString() || "")

    // endpoint cost: (# subnets * 730 hours per month * 0.10 USD)
    let endpointCosts = numSubnets * 730 * 0.10

    // connection cost: (# VPNs * hours per day * working days * 0.05 USD)
    let hoursPerDay: number = 0
    switch (hoursUnits) {
      case "day":
        hoursPerDay = hours
        break;

      case "week":
        hoursPerDay = hours / 7
        break;
      
      case "month":
        hoursPerDay = hours * (24 / 730) // (24 hours in a day / 730 hours in a month)
        break;
    
      default:
        break;
    }
    let connCosts = numVpns * hoursPerDay * numWorkingDays * 0.05;

    return endpointCosts + connCosts
  }
}
