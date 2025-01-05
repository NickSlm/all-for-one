import os
from dotenv import load_dotenv
import base64
import urllib.parse
load_dotenv()   # load the .env file into the environment variables 

DB_NAME = os.getenv("MONGO_DB_NAME")
DB_USERNAME = urllib.parse.quote_plus(os.getenv("MONGO_USERNAME"))
DB_PASSWORD = urllib.parse.quote_plus(os.getenv("MONGO_PASSWORD"))
MONGO_URI = f"mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@{DB_NAME}.l4ry07b.mongodb.net/"
SECRET_KEY = os.getenv("SECRET_KEY")
MODELS_DIR = "/home/nick/all-for-one/backend/models/models"

