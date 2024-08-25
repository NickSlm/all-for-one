import os
from pymongo.mongo_client import MongoClient
import matplotlib.pyplot as plt
import hashlib
import config
import tensorflow as tf
from tensorflow import keras
import numpy as np
from bson.binary import Binary
from PIL import Image as im
import pickle



client = MongoClient(config.MONGO_URI)
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
   
db = client.mydatabase
collection = db.users

def authorization(emailAddress, password):
    user = collection.find_one({"emailAddress": emailAddress})
    u_hash = user["hash"]
    u_salt = user["salt"]
    
    p_password = password + u_salt
    h_password = hashlib.md5(p_password.encode())
    
    return True if h_password.hexdigest() == u_hash else False

def check_if_exists(emailAddress):
    return True if collection.find_one({"emailAddress": emailAddress}) else False

def _create_password(password):
    salt = str(os.urandom(16))
    pwd = password + salt
    hash_pwd = hashlib.md5(pwd.encode())
    return hash_pwd.hexdigest(), str(salt)

def create_user(emailAddress, password, firstName, lastName):
    hash, salt = _create_password(password)
    collection.insert_one({"emailAddress": emailAddress,
                            "firstName": firstName,
                            "lastName": lastName,
                            "hash": hash,
                            "salt": salt})
    
def get_user(user_id):
    return collection.find_one({"_id": user_id})["username"]

# def upload_image(username, n_images):
#     images = generate_image(n_images)
#     b_images = [Binary(pickle.dumps(image)) for image in images]
#     query = {"username": username}
#     update = {"$push": {"images":{'$each': b_images}}}
#     collection.update_one(query, update)
      
def get_user_images(emailAddress):
    user_data = collection.find_one({"emailAddress":emailAddress})
    user_images = user_data["images"]
    images = [pickle.loads(image) for image in user_images]
    return images
    
