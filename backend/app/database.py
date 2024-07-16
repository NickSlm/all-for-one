import os
from pymongo.mongo_client import MongoClient
import hashlib
import config
import tensorflow as tf
from tensorflow import keras
import numpy as np

client = MongoClient(config.MONGO_URI)
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
   
db = client.mydatabase
collection = db.users


def authorization(username, password):
    user = collection.find_one({"username": username})
    u_hash = user["hash"]
    u_salt = user["salt"]
    
    p_password = password + u_salt
    h_password = hashlib.md5(p_password.encode())
    
    return True if h_password.hexdigest() == u_hash else False

def check_if_exists(username):
    return True if collection.find_one({"username": username}) else False

def _create_password(password):
    salt = str(os.urandom(16))
    pwd = password + salt
    hash_pwd = hashlib.md5(pwd.encode())
    return hash_pwd.hexdigest(), str(salt)

def create_user(username, password):
    hash, salt = _create_password(password)
    collection.insert_one({"username": username,
                            "hash": hash,
                            "salt": salt})
    
def get_user(user_id):
    return collection.find_one({"_id": user_id})["username"]


def upload_image(username, n_images):
    images = generate_image(n_images)
    query = {"username": username}
    new_values = {"$set": {"images":[image for image in images]}}
    collection.update_one(query, new_values)
        
def generate_image(n_images):
    dir_path = "/home/nick/all-for-one/backend/models/models"
    file_name = "myGan.h5"
    gen = keras.models.load_model(os.path.join(dir_path, file_name))
    latent_dim = tf.random.normal(shape=[n_images, 100])
    generated_images = gen(latent_dim).numpy()
    return generated_images