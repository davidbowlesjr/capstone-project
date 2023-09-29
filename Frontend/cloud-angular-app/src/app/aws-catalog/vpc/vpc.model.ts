import { AWSProduct } from "../models/aws-product.model"

export interface VpcProduct extends AWSProduct {
    name: "VPC",
    cost : {
        siteToSite: {
            numVpns: number,
            avgDuration: number,
            avgDurationUnits: string
        },
        client: {
            numSubnets: number,
            numActiveVpns: number,
            avgDuration: number,
            avgDurationUnits: string,
            numWorkingDays: number
        }
    }
}

export function isVpcProduct(obj: any): obj is VpcProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}