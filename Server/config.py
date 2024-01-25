from os import environ
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy



load_dotenv()

app = Flask(__name__)

db = SQLAlchemy()

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////Users/generali/mwanasayanSEE/Moringa-MajibuWajibu/Server/instance/moringa.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
app.secret_key = environ.get('SECRET KEY')

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

CORS(app)
migrate = Migrate(app,db)
db.init_app(app)

bcrypt = Bcrypt(app)
api =Api(app)
