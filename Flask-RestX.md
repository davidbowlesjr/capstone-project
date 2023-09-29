FLASK-RESTX

## FLASK-RESTX

## Virtual Environment

### To create the environment

```
python -m venv .venv
```

### To activate the virtual environment

- Source Method (Windows)

```
source .venv/Scripts/activate
```
- Source Method (Mac)

```
source .venv/bin/activate
```

- Powershell
    
    ```
    \Scripts\Activate.ps1
    ```
    
- CMD
    
    ```
    \Scripts\activate.bat
    ```
    

### To Deactivate

```
deactivate
```

## Required dependencies for Flask-RestX

```
pip install Flask flask-restx flask-cors gunicorn structlog
```

## Create a Server Folder and Go into the folder

```
mkdir server
cd server
```

## Create three files

```
touch main.py __init__.py config.py
```

## Main.py

```python
from flask import Flask
from flask_restx import Api, Namespace, Resource
from flask_cors import CORS
from structlog import get_logger
from werkzeug.middleware.proxy_fix import ProxyFix

logger = get_logger(__name__)

# INITIALIZE APP
app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_port=1)

# LOAD THE CONFIG FROM CONFIG CLASS
app.config.from_object('server.config.DevelopmentConfig')

# CORS
cors = CORS()
cors.init_app(app, resources={"*" : {"origins" : "*"}})

# API
api = Api(version="1.0", title="Flask Restx", doc="/api/v1/docs")
api.init_app(app)
api_namespace = Namespace("api")

# RESOURCE 
class Ping(Resource):
    def get(self):
        logger.debug("Ping.GET")
        return { "message" : "pong"}, 200

# API ENDPOINTS
api_namespace.add_resource(Ping, "/ping")
api.add_namespace(api_namespace, path="/api/v1")
```

## Config.py

```python
class BaseConfig:
    TESTING = False
    SECRET_KEY = "change me"
    SQLALCHEMY_DATABSE_URI = 'sqlite:///./bug-tracker.sqlite3'
    BUNDLE_ERRORS = True
    JWT_SECRET_KEY = 'lincoln'
    
class DevelopmentConfig(BaseConfig):
    pass

class TestingConfig(BaseConfig):
    TESTING = True
    pass
```

## Run the File (Mac)

```
gunicorn -b 0.0.0.0:8000 server.main:app
```

## Run the File (Windows)

```
waitress-serve --listen=127.0.0.1:5000 server.main:app
```
