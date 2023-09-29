
from flask import *
from flask_cors import CORS, cross_origin
from flask_restx import Namespace, Resource, fields
from Serializers.serializers import post_cloud_formation_serializer, put_cloud_formation_serializer, get_by_user_id_cloud_formation_serializer, delete_cloud_formation_serializer
from structlog import get_logger
from Services.CloudFormationService import CloudFormationService


logger = get_logger(__name__)

service = CloudFormationService

cloud_template_s3_namespace = Namespace("cloud-template-s3", description = "Register a new user returns private url")

#Written By David Bowles
class CloudFormationToS3(Resource):

    #TODO:
    # @cloud_template_s3_namespace
    # def get(self, s3_bucket_dir):
    #     logger.debug("CloudFormationToS3.GET s3_bucket_dir")
    #     pass

    @cloud_template_s3_namespace.expect(get_by_user_id_cloud_formation_serializer)
    def get(self):
        logger.debug("CloudFormationToS3.GET UserId")
        args = get_by_user_id_cloud_formation_serializer.parse_args()
        return service.getS3TemplatesByUser(service, args["userId"])
        
    @cloud_template_s3_namespace.expect(post_cloud_formation_serializer, validate=True)
    def post(self):
        """Upload CloudFormation Template to S3 and save it to User in Database"""
        logger.debug("CloudFormationToS3.POST")
        args = post_cloud_formation_serializer.parse_args()
        return jsonify(service.uploadAndSaveTemplate(service, args["userId"],args["monthlyCost"],args["name"],args["cloudFormationJson"]))
    
    @cloud_template_s3_namespace.expect(put_cloud_formation_serializer)
    def put(self):
        logger.debug("CloudFormationToS3.GET UserId")
        args = put_cloud_formation_serializer.parse_args()
        return service.updateS3Template(service, args["templateId"], args["monthlyCost"], args["cloudFormationJson"])
    
    @cloud_template_s3_namespace.expect(delete_cloud_formation_serializer)
    def delete(self):
        logger.debug("CloudFormationToS3.DELETE TemplateId")
        args = delete_cloud_formation_serializer.parse_args()
        return service.deleteUserTemplate(service, args["templateId"])


cloud_template_s3_namespace.add_resource(CloudFormationToS3, "")
        
