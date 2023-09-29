
from sqlalchemy import create_engine, select, exc, URL
from sqlalchemy.orm import Session
from Models.UserModels import User
from structlog import get_logger

logger = get_logger(__name__)

db_url = URL.create(
    drivername="postgresql",
    username="postgres",
    password="developintelligence",  # plain (unescaped) text
    host="lpp-capstone-db.cfrjxdllgceq.us-east-2.rds.amazonaws.com",
    database="postgres",
)

engine = create_engine(
    db_url, 
    echo=True,
    pool_pre_ping=True,
        connect_args={
            "keepalives": 1,
            "keepalives_idle": 30,
            "keepalives_interval": 10,
            "keepalives_count": 5,
        }  )

session = Session(engine)

#Written By David Bowles
class UserDBService():
    def getUserByLogin(self, email: str, password: str):
            
        logger.debug("UserDBService.getUserByLogin Started")
        stmt = select(User).filter_by(email = email, password = password )

        try:
            result = session.execute(stmt).scalars().all()[0].as_dict()
        except IndexError:
            logger.debug("UserDBService.getUserByLogin Index Error")
            return {
                "success": False,
                "message":"Username or Password Invalid"}

        try:
            self.commit_changes()
        except Exception:
            self.rollback_changes()  
            return {
            "success": False,
            "message": "Error"
            }
          

        logger.debug("UserDBService.getUserByLogin Successful")
        return result
    

    def registerNewUser(self, email:str, password:str, orgName: str, firstName:str, lastName: str):
        newUser = User()
        newUser.email = email
        newUser.password = password
        newUser.org_name = orgName
        newUser.first_name = firstName
        newUser.last_name = lastName
        newUser.is_admin = False

        session.add(newUser)
        try:
            self.commit_changes()
            result = self.getUserByLogin(self, email, password)
            return result
        except exc.IntegrityError:
            self.rollback_changes()
            return {"success":False, "message":"Username is already taken"}
        except Exception:
            self.rollback_changes()  
            return {
            "success": False,
            "message": "Error"
            }
        
    def commit_changes():
        session.commit()

    def rollback_changes():
        session.rollback()
