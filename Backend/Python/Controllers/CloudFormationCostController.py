from flask import *
from flask_cors import CORS, cross_origin
from flask_restx import Namespace, Resource, fields
from Serializers.serializers import post_cloud_formation_cost_serializer
from structlog import get_logger
from Services.CloudFormationCostService import CloudFormationCostService

logger = get_logger(__name__)

service = CloudFormationCostService

cloud_template_cost_namespace = Namespace("cloud-template-cost", description = "Calculate Cost of CloudFormation Template")

#Written By David Bolwes
class CloudFormationCost(Resource):
    
    @cloud_template_cost_namespace.expect(post_cloud_formation_cost_serializer)
    def post(self):
        logger.debug("CloudFormationCost.POST")
        args = post_cloud_formation_cost_serializer.parse_args()
        return service.calculateCloudTemplateCost(service, args["serviceName"],args["cloudFormationJson"])
    
cloud_template_cost_namespace.add_resource(CloudFormationCost, "")