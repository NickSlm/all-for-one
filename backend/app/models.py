import os
from flask_jwt_extended import JWTManager
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow import keras
import io

jwt = JWTManager()


def array_to_image(arr):
    """
    converts generated GAN image from tanh ndarray
    to PIL image
    """
    arr = (arr + 1) / 2
    arr = (arr * 255).astype(np.uint8)
    image = Image.fromarray(arr)
    image_io = io.BytesIO()
    image.save(image_io, 'JPEG')
    image_io.seek(0)
    return image_io

def generate_image(n_images=1):
    dir_path = "/home/nick/all-for-one/backend/models/models"
    file_name = "myGan.h5"
    gen = keras.models.load_model(os.path.join(dir_path, file_name))
    latent_dim = tf.random.normal(shape=[n_images, 100])
    generated_images = gen(latent_dim).numpy()[0]
    return array_to_image(generated_images)