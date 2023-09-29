import { AWSProduct } from "../models/aws-product.model"

export interface RDSProduct extends AWSProduct {
    name: "RDS",
    // vvv THIS WILL CHANGE PER EACH SERVCE vvv
    cost : {
        // Utilization: {
        //     UtilizationType: string,
        //     UtilizationUnits: string,
        // },
        nodes: number,
        allocatedStorage: number,
        engine: string,
        dbInstanceClass: string,
        masterUsername: string,
        masterPassword: string,
        deploymentOption: string,
        retentionPeriod: string,
        additionalBackupStorage: number,
        totalSizeBackup: number
        }
    }

export function isS3Product(obj: any): obj is RDSProduct {
    return 'id' && 'cloudFormation' && 'cost' in obj
}