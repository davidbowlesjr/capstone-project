export interface UserTemplate {
    userTemplate : {
        id: number,
        name: string,
        date: Date,
        s3_bucket_dir: string,
        monthly_cost: number,
        user_id: number
    }
}