from __future__ import annotations
from sqlalchemy import Date, ForeignKey, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base
from camel_converter import to_camel


Base = declarative_base()

#Written By David Bowles
class User(Base):
    __tablename__ = "user"

    id = Column("id", Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    org_name = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    is_admin = Column(Boolean)
    

    def __repr__(self):
        return f"User({self.id},'{self.email}','{self.password}','{self.orgName}','{self.firstName}','{self.lastName})"
    
    def __str__(self):
        return f"User({self.id},'{self.email}','{self.password}','{self.orgName}','{self.firstName}','{self.lastName})"

    def as_dict(self):
       userDict = {to_camel(c.name): getattr(self, c.name) for c in self.__table__.columns}
       userDict.pop("password")
       return {"user": userDict}

#Written By David Bowles
class UserTemplate(Base):
    __tablename__ = "user_template"

    id = Column("id", Integer, primary_key=True)
    s3_bucket_dir = Column(String)
    #Decimal not stored. Ex: 12.99 will be stored as 1299
    monthly_cost = Column(Integer)
    name = Column(String)
    date = Column(String)
    user_id = Column(Integer , ForeignKey('user.id'))

    def as_dict(self):
       userTemplateDict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       return {"userTemplate": userTemplateDict}
    