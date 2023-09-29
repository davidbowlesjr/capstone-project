import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 's3bucketLink'})
export class S3BucketLinkPipe implements PipeTransform {
    s3_bucket = 'https://capstone-cloud-template-bucket.s3.us-east-2.amazonaws.com/'
    transform(value: string) {
        return this.s3_bucket + value
    }

}