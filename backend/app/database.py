import os
from pymongo.mongo_client import MongoClient
import hashlib
import config


client = MongoClient(config.MONGO_URI)
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    
db = client.mydatabase
collection = db.users

def get_db_name():
    return db.name

def create_user(username, salt):
    pass

def get_user(username):
    pass

def check_if_exists():
    pass

def _create_password(password):
    salt = str(os.urandom(16))
    pwd = password + salt
    hash_pwd = hashlib.md5(pwd.encode())
    return hash_pwd.hexdigest(), str(salt)
    