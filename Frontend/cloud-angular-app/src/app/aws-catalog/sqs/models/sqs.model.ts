import { AWSProduct } from "../../models/aws-product.model"

export interface SQSProduct extends AWSProduct {
    name: "SQS",
    
    cost : {
        //addDeadLetterQueue: boolean, <-- *Need to implement this
        standardQueueRequests: number,
        fifoQueueRequests: number
        outboundDataTransferRegion: string,
        outboundDataTransferAmount: number,
        outboundDataTransferUnit: string
        }
    }


export function isSQSProduct(obj: any): obj is SQSProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}
