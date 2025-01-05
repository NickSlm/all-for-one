import os
from flask_jwt_extended import JWTManager
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow import keras
import config
import base64
import io


def array_to_image(arr):
    """
    converts generated GAN image from tanh ndarray
    to PIL image
    """
    arr = (arr + 1) / 2
    arr = (arr * 255).astype(np.uint8)
    images = [Image.fromarray(image) for image in arr]
    image_array = []
    for img in images:
        image = io.BytesIO()
        img.save(image, 'JPEG')
        image.seek(0)
        encoded_string = base64.b64encode(image.getvalue()).decode('utf-8')
        image_array.append(encoded_string)
    return image_array

def generate_image(n_images=1):
    dir_path = config.MODELS_DIR
    file_name = "myGan.h5"
    gen = keras.models.load_model(os.path.join(dir_path, file_name))
    latent_dim = tf.random.normal(shape=[n_images, 100])
    generated_images = gen(latent_dim).numpy()
    return array_to_image(generated_images)