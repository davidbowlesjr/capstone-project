import { AWSProduct } from "../models/aws-product.model"

export interface ec2Product extends AWSProduct {
    name: "EC2 Instance"
    cost : {
        InstanceType: string,
        OperatingSystem:string
    };
    pricing: {
        upfront: number;
        monthly: number;
        annual: number;
    };
}

export function isec2Product(obj: any): obj is ec2Product {
    return 'id' && 'ec2' && 'cost' in obj

}