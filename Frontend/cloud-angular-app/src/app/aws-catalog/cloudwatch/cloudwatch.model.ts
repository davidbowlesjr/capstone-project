import { AWSProduct } from "../models/aws-product.model"

export interface CloudWatchProduct extends AWSProduct {
    name: "Cloud Watch Alarm"
    cost : {
        comparisonOperator: string,
        numberOfBreaches: number,
        evaluationPeriod: number,
        threshold: number,
        alarmAction: string
    };
    pricing: {
        upfront: number;
        monthly: number;
        annual: number;
    };

}

export function isCloudWatchProduct(obj: any): obj is CloudWatchProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}