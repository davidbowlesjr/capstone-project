export interface AWSProduct {
    id: number,
    cost: {},
    cloudFormation: string,
    name?: string;
    pricing?: {
        upfront: number;
        monthly: number;
        annual: number;
    };

}

export function isAWSProduct(obj: any): obj is AWSProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}