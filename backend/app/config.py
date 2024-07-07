import os
from dotenv import load_dotenv
import base64
load_dotenv()   # load the .env file into the environment variables 

DB_NAME = os.getenv("MONGO_DB_NAME")
DB_USERNAME = os.getenv("MONGO_USERNAME")
DB_PASSWORD = os.getenv("MONGO_PASSWORD")
DB_HOST= os.getenv("MONGO_HOST")
DB_PORT= os.getenv("MONGO_PORT")
MONGO_URI = f"mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@{DB_NAME}.l4ry07b.mongodb.net/?retryWrites=true&w=majority&appName={DB_NAME}"
SECRET_KEY = os.getenv("SECRET_KEY")


