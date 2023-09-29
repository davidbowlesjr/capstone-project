import { AWSProduct } from "../models/aws-product.model"

export interface SesProduct extends AWSProduct {
    SES: {
        Type: "AWS::SES::ConfigurationSet",
        Properties: {
            "Name": string,
            "Email Messages from EC2":number,
            "Email Messages from EC2 Unit":string,
            "Data Sent from EC2":number,
            "Number of Dedicated IP(standard) Addresses":string
        }
    }
}

export function isSesProduct(obj: any): obj is SesProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}