import { AWSProduct } from "../models/aws-product.model"

export interface S3Product extends AWSProduct {
    name: "S3 Standard",
    cost : {
        region: string,
        storage : {
            amount: number,
            units: string
        },
        moveType: string,
        averageObj : {
            size: number,
            units: string
        },
        numRequests : number,
        miscRequests: number,
        returnedByS3 : {
            amount: number,
            units: string
        },
        scannedByS3 : {
            amount: number,
            units: string
        }
    }
}

export function isS3Product(obj: any): obj is S3Product {
    return 'id' && 'cloudFormation' && 'cost' in obj
}