from flask.cli import FlaskGroup
from flask import current_app
from flask import Flask
from flask_restx import Api
from flask_cors import CORS
import os

from Controllers.LoginRegisterController import register_namespace as registerApi
from Controllers.LoginRegisterController import login_namespace as loginApi
from Controllers.CloudFormationToS3Controller import cloud_template_s3_namespace as cloudFormationToS3Api
from Controllers.CloudFormationCostController import cloud_template_cost_namespace as cloudFormationCostApi

app = Flask(__name__)
#Written By David Bowles
def create_api():
    api = Api(
        title="API",
        version="1.0",
        description="A register API",
    )

    api.add_namespace(registerApi)
    api.add_namespace(loginApi)
    api.add_namespace(cloudFormationToS3Api)
    api.add_namespace(cloudFormationCostApi)

    return api



if __name__ == "__main__":

    CORS(app)
    api = create_api()
    api.init_app(app)

    print(os.getenv("FLASK_ENV"))
    if os.getenv("FLASK_ENV") == "production":

        host = '0.0.0.0'
        port = 5000
    else:
        host = None
        port = 8080
    app.run(host=host, debug=True, port=port)