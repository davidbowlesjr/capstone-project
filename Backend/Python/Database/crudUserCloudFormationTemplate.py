from __future__ import annotations
from typing import  Union
import datetime
import inspect
from sqlalchemy import create_engine, select, exc, update, URL
import sqlalchemy
from sqlalchemy.orm import Session
from Models.UserModels import User
from structlog import get_logger
from Models.UserModels import UserTemplate

#Written By David Bowles
logger = get_logger(__name__)

db_url = URL.create(
    drivername="postgresql",
    username="postgres",
    password="developintelligence",  # plain (unescaped) text
    host="lpp-capstone-db.cfrjxdllgceq.us-east-2.rds.amazonaws.com",
    database="postgres",
)

engine = create_engine( db_url,
                        echo=True,
                        pool_pre_ping=True,
                        connect_args={
                            "keepalives": 1,
                            "keepalives_idle": 30,
                            "keepalives_interval": 10,
                            "keepalives_count": 5,
                        },)

session = Session(engine)

def get_user_template_by_template_id(template_id: int) -> UserTemplate | str:
    """returns a single user template"""

    logger.debug("get_user_template_by_template_id")
    stmt = select(UserTemplate).filter_by(id = template_id)

    try:
        return session.execute(stmt).scalars().all()[0].as_dict()
    except IndexError:
            return {
                 "success": False,
                 "message":"template id invalid"
                 }
    

def get_user_templates_by_user_id(user_id: int) -> UserTemplate:
    """returns a single user template"""

    logger.debug("get_user_template_by_template_id")
    stmt = select(UserTemplate).filter_by(user_id = user_id)

    try:
        result = session.execute(stmt).scalars().all()
        #TODO:loop through all values and return them as dict form
        return result
    except IndexError:
            
            return {
                 "success": False,
                 "message":"used id Invalid"}
    
def get_user_templates_by_s3_bucket_dir(s3_bucket_dir: str) -> UserTemplate:
    """returns a single user template"""

    logger.debug("get_user_template_by_template_id")
    stmt = select(UserTemplate).filter_by(s3_bucket_dir = s3_bucket_dir)

    try:
        result = session.execute(stmt).scalars().all()[0].as_dict()
        #TODO:loop through all values and return them as dict form
        return result
    except IndexError:
            return {
                 "success": False,
                 "message":"s3 bucket dir invalid or not tied to database"}
    except TypeError:
            return {
                 "success": False,
                 "message":"UserId Is not found in user_template table"}


def create_user_template(s3_bucket_dir:str, monthly_cost: int, name:str, user_id:str) -> UserTemplate:
    """creates a single user template"""
    createdAt = datetime.date.today().__str__()
    print ('CRUD CLOUD TEMPLATE CREATE')
    logger.debug("create_user_template: ")
    userTemplate = UserTemplate(s3_bucket_dir=s3_bucket_dir, monthly_cost = monthly_cost, name = name, date = createdAt, user_id = user_id)
    session.add(userTemplate)
    try:
        session.commit()
    except Exception as e:
        session.rollback()
        return {
                 "success": False,
                 "message":"Error"}
    return userTemplate.as_dict()
    

def update_user_template(template_id,  monthly_cost: int, s3_bucket_dir:str, user_id:str) -> UserTemplate:
    """creates a single user template"""

    logger.debug("update_user_template")
    userTemplate = UserTemplate(id = template_id, s3_bucket_dir=s3_bucket_dir, monthly_cost = monthly_cost, user_id = user_id)

    uStmt = update(UserTemplate)
    uStmt = uStmt.values({"monthly_cost":monthly_cost})
    uStmt = uStmt.where(UserTemplate.id == template_id)

    session.execute(uStmt)
    #session.add(userTemplate)
    session.commit()
    return userTemplate.as_dict()

def delete_user_template_by_id(template_id: int) -> Union[UserTemplate, None]:
    """deletes a single user template"""

    logger.debug("delete_user_template")
    try:
        session.query(UserTemplate).filter(UserTemplate.id == template_id).delete()
    except Exception:
        return {
         "success": False,
         "message": "Delete by template ID failed"
         }
    try:
        session.commit()
        return {
            "success": True,
            "message":"User Template: "+str(template_id)+" Deleted"
            }
    except Exception:
        return {
         "success": False,
         "message": "Delete by template ID failed"
        }