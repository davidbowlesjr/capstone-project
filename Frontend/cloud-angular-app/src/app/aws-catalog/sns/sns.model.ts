import { AWSProduct } from "../models/aws-product.model"

export interface SNSProduct extends AWSProduct {
    name: string,
    id: number,
    TopicName : string,
    Protocol : string,
    Endpoint: string,
    
    cost : {
        region: string,
        requests: number,
        requestUnits: string,
        httpNotifications: number,
        httpNotificationUnits: string,
        emailNotifications: number,
        emailNotificationUnits: string,
        sqsNotifications: number,
        sqsNotificationUnits: string,
        inboundDataTransfer: number,
        inboundUnits: string,
        outboundDataTransfer: number,
        outboundUnits: string
    };
    pricing: {
        upfront: number;
        monthly: number;
        annual: number;
    };
}

export function isSNSProduct(obj: any): obj is SNSProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}