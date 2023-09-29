import json
import boto3
import botocore
import datetime
from structlog import get_logger

logger = get_logger(__name__)


#Written By David Bowles
class CloudFormationCostService:
    #TODO: Implement a better env infra
    #If running on Local machine set environment variable 'local'.
    environment = "local"
    
    bucketName = 'capstone-cloud-template-bucket'


    if environment == "local":
        #Your AWS Access and Secret key are in C:\Users\<your_user_name>\.aws\credentials
        ACCESS_KEY = "AKIAXZGJ4UHY3AFSGIEN"
        SECRET_KEY = "mnH36L6O9MrBycILysRCn77hOMk4G0T4pddecqVL"
        client = boto3.client(
            'cloudformation', 
            region_name='us-east-2',
            verify = False,
            aws_access_key_id= ACCESS_KEY,
            aws_secret_access_key= SECRET_KEY,
        )
    else:
        client = boto3.client('cloudformation', region_name='us-east-2')

    def calculateCloudTemplateCost(self,serviceName, cloudTemplate: dict):
        try:
            response = self.client.estimate_template_cost(TemplateBody = cloudTemplate)
        except Exception as e:
            return {"success":False,
                    "message":"Error when calculating cost of Template ",
                    "Error": e.__str__()}

        return response
