import json
import boto3
import botocore
import datetime
from structlog import get_logger

logger = get_logger(__name__)

from Database.crudUserCloudFormationTemplate import (
        get_user_template_by_template_id,
        get_user_templates_by_user_id,
        get_user_templates_by_s3_bucket_dir,
        update_user_template,
        create_user_template,
        delete_user_template_by_id
    )

#Written By David Bowles
class CloudFormationService():

    #TODO: Implement a better env infra
    #If running on Local machine set environment variable 'local'.
    environment = "local"
    
    bucketName = 'capstone-cloud-template-bucket'


    if environment == "local":
        #Your AWS Access and Secret key are in C:\Users\<your_user_name>\.aws\credentials
        ACCESS_KEY = "AKIAXZGJ4UHY3AFSGIEN"
        SECRET_KEY = "mnH36L6O9MrBycILysRCn77hOMk4G0T4pddecqVL"
        client = boto3.client(
            's3', 
            region_name='us-east-2',
            verify = False,
            aws_access_key_id= ACCESS_KEY,
            aws_secret_access_key= SECRET_KEY,
        )
    else:
        client = boto3.client('s3', region_name='us-east-2')


    
    #Uploads CloudFormation Template to S3 and ties it to a new row in user_templates table
    def uploadAndSaveTemplate(self, userId:int, monthlyCost:int, name:str, cloudFormationJson:dict):
        templateDir = self.uploadS3Template(self, userId, cloudFormationJson)
        result = create_user_template(templateDir, monthlyCost, name, userId)
        return result


    #Upload CloudFormation Template to S3 as JSON
    def uploadS3Template(self, userId , cloudFormationJson:dict):
        logger.debug("CloudFormationService.uploadS3Template Started")
        s3Key = userId+"/cloud-template-"+datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')+".json"

        self.client.put_object(
            Bucket=self.bucketName, 
            Key= s3Key,
            Body=json.dumps(cloudFormationJson)
        )

        logger.debug("CloudFormationService.uploadS3Template Completed")

        return s3Key
        
    #Update S3 object and db row by template id
    def updateS3Template(self, templateId, monthlyCost, cloudFormationJson:dict):
        logger.debug("CloudFormationService.updateS3Template Started")
        _userTemplate = get_user_template_by_template_id(templateId)

        if _userTemplate.get("userTemplate") is None:
            return _userTemplate

        _userTemplateDict = _userTemplate.get("userTemplate")

        self.client.put_object(
            Bucket=self.bucketName, 
            Key= _userTemplateDict.get("s3_bucket_dir"),
            Body=json.dumps(cloudFormationJson)

        )
        if not(monthlyCost == None): 
            logger.debug("CloudFormationService.updateS3Template Completed")
            return update_user_template(_userTemplateDict.get("id"), monthlyCost, _userTemplateDict.get("s3_bucket_dir"), _userTemplateDict.get("user_id"))
        else:
            return _userTemplate

    #Get S3 Template database rows by user id
    def getS3TemplatesByUser(self, userId:int):

        logger.debug("CloudFormationService.getS3TemplatesByUser User ID: "+ str(userId)+ " Started")
        s3Result = self.client.list_objects_v2(Bucket=self.bucketName, Prefix=str(userId)+"/", Delimiter='/')
        s3Keys = []
        result = []

        try:
            for object in s3Result.get('Contents'):
                s3Keys.append(object.get("Key")) 
        except TypeError:
            logger.debug("CloudFormationService.getS3TemplatesByUser User ID: "+ str(userId)+ " Failed")
            return {
                "success": False,                
                "message:":"No S3 objects tied to User ID"
                }

        for key in s3Keys:
            result.append(get_user_templates_by_s3_bucket_dir(key))

        logger.debug("CloudFormationService.getS3TemplatesByUser User ID: "+ str(userId)+ " Complete")
        
        return result

    #Delete S3 Object and db table row by template id    
    def deleteUserTemplate(self, templateId):
        _userTemplate = get_user_template_by_template_id(templateId)
        if _userTemplate.get("userTemplate") is None:
            return {
                    "success": False,
                    "message": _userTemplate.get("message")
                    }

        self.client.delete_object(Bucket = self.bucketName, Key = _userTemplate.get("userTemplate").get("s3_bucket_dir"))
        
        return delete_user_template_by_id(_userTemplate.get("userTemplate").get("id"))