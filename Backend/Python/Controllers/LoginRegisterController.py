from Database.UserDBService import UserDBService
from flask import *
from flask_cors import CORS, cross_origin
from flask_restx import Namespace, Resource, fields
from structlog import get_logger
from Serializers.serializers import post_register_serializer, post_login_serializer
import os

logger = get_logger(__name__)

service = UserDBService

register_namespace = Namespace("register", description = "Register a new user")

login_namespace = Namespace("login")

class Register(Resource):
    @register_namespace.expect(post_register_serializer)
    def post(self):
        logger.debug("Register.POST")
        args = post_register_serializer.parse_args()
        return service.registerNewUser(service, args["email"], args["password"], args["orgName"],args["firstName"],
                                       args["lastName"])

class Login(Resource):
    @login_namespace.expect(post_login_serializer)
    def post(self):
        logger.debug("Login.POST")
        args = post_login_serializer.parse_args()
        email = args["email"]
        password = args["password"]
        user = service.getUserByLogin(service, args["email"], args["password"])
        print(user["user"]["isAdmin"])
        return user
        print("Success")

        if user:
            return jsonify({
                'id': user.id,
                'email': user.email,
                'orgName': user.orgName,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'isAdmin': user.is_admin
            }), 200
        
        return jsonify({'message': 'Invalid credentials'}), 401
    


register_namespace.add_resource(Register, "")
login_namespace.add_resource(Login,"")



def runApp():

    print(os.getenv("FLASK_ENV"))
    if os.getenv("FLASK_ENV") == "production":

        host = '0.0.0.0'
        port = 5000
    else:
        host = None
        port = 8080
    app.run(host=host, port=port, debug=True)


