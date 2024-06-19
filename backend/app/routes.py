from flask import render_template
import datetime
from dotenv import load_dotenv


# load_dotenv()   # load the .env file into the environment variables 

# MONGO_URI = os.getenv("MONGO_URL")

def home():
    return "Main Page!"
    
def signup():
    return {
        "Username": None,
        "Password": None
    }
    
def login():
    return {
        "Username": None,
        "Password": None
    }

