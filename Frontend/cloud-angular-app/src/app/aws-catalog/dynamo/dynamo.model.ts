import { AWSProduct } from "../models/aws-product.model"

export interface DynamoProduct extends AWSProduct {
    name: "DynamoDB",
    cost : {
        Region: string,
        TableClass : string,
        DataStorage: {
            StorageSize: number,
            StorageSizeUnit: string,
            AvgItemSize: number,
            AvgItemSizeUnit: string
        },
        Write : {
            NonTransactionalWritePercent: number,
            TransactionalWritePercent: number,
            BaselineWriteRate: number,
            BaselineWriteRateUnit: string,
            PeakWriteRate: number,
            PeakWriteRateUnit: string,
            DurationPeakWrite: number,
            DurationPeakWriteUnit: string,
            PercentBaselineWriteCovered: number,
            WriteReservedTerm: number
        },
        Read:{
                EventuallyConsistentPercent: number,
                StronglyConsistentPercent: number,
                TransactionPercent: number,
                BaselineReadRate: number,
                BaselineReadUnit: string,
                PeakReadRate: number,
                PeakReadUnit: string,
                ReadPeakDuration: number,
                ReadPeakDurationUnit: string,
                BaselinePercentRead: number,
                ReadReservedCapacity: number
        }
    },
    pricing: {
        upfront: number;
        monthly: number;
        annual: number;
    }
}

export function isDynamoProduct(obj: any): obj is DynamoProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}

