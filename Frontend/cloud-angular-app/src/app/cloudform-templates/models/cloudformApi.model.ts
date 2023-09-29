export interface CloudformApiRequest {
    userId: number,
    name: string,
    monthlyCost: number,
    cloudFormationJson: string
}

export interface CloudformApiResponse {
    userTemplate : {
        id: number,
        monthlyCost: number,
        name: string,
        date: Date,
        s3_bucket_dir: string,
        userId: number
    }
}