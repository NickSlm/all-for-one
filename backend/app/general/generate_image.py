from flask import Blueprint, request, session, send_file
from models import generate_image
generate_image_bp = Blueprint("generate_image_bp", __name__)


@generate_image_bp.route('/generate_image')
def generate_images():
    n_images = request.json["n_images"]
    print(n_images)
    image = generate_image()
    return send_file(image, mymetype='image/jpeg')
    