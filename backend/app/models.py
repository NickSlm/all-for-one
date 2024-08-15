import os
from flask_jwt_extended import JWTManager
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow import keras
import io

jwt = JWTManager()
