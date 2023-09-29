import { AWSProduct } from "../models/aws-product.model"

export interface LambdaProduct extends AWSProduct {
    name: "Lambda",
    // vvv THIS WILL CHANGE PER EACH SERVCE vvv
    cost : {
        Region: string,
        Architecture : string,
        Requests: {
            NumberOfRequests: number,
            NumberOfRequestsUnits: string,
            DurationOfRequest: number,
        },
        Memory : {
            MemoryAllocated: number,
            MemoryUnit: number
        },
        EphemeralStorage :{
            EphemeralStorageAllocated: number,
            EphemeralStorageAllocatedUnit: string
        }
    };
    pricing: {
        upfront: number;
        monthly: number;
        annual: number;
    };
    
}

export function isS3Product(obj: any): obj is LambdaProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}
