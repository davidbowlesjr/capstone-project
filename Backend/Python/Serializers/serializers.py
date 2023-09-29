from flask_restx import reqparse

#Written By David Bowles

post_login_serializer = reqparse.RequestParser()
post_login_serializer.add_argument("email", required=True)
post_login_serializer.add_argument("password", required=True)

post_register_serializer = reqparse.RequestParser()
post_register_serializer.add_argument("email", required=True)
post_register_serializer.add_argument("password", required=True)
post_register_serializer.add_argument("orgName", required=True)
post_register_serializer.add_argument("firstName", required=True)
post_register_serializer.add_argument("lastName", required=True)

post_cloud_formation_serializer = reqparse.RequestParser()
post_cloud_formation_serializer.add_argument("userId", required = True)
post_cloud_formation_serializer.add_argument("monthlyCost", required = True)
post_cloud_formation_serializer.add_argument("name", required = True)
post_cloud_formation_serializer.add_argument("cloudFormationJson", required = True)

put_cloud_formation_serializer = reqparse.RequestParser()
put_cloud_formation_serializer.add_argument("templateId", required = True)
put_cloud_formation_serializer.add_argument("monthlyCost")
put_cloud_formation_serializer.add_argument("cloudFormationJson", required = True)
put_cloud_formation_serializer.add_argument("cloudFormationDir")

get_by_user_id_cloud_formation_serializer = reqparse.RequestParser()
get_by_user_id_cloud_formation_serializer.add_argument("userId", type=int, required = True)

delete_cloud_formation_serializer = reqparse.RequestParser()
delete_cloud_formation_serializer.add_argument("templateId", type=int, required = True)

post_cloud_formation_cost_serializer = reqparse.RequestParser()
post_cloud_formation_cost_serializer.add_argument("cloudFormationJson", required = True)
post_cloud_formation_cost_serializer.add_argument("serviceName", required = True)