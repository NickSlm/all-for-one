from flask import Blueprint, request, session, send_file, jsonify
from .utils import generate_image


generate_image_bp = Blueprint("generate_image_bp", __name__)


@generate_image_bp.route('/generate_image', methods=["POST", "GET"])
def generate_images():
    n_images = request.json["n_images"]
    images = generate_image(n_images)
    return jsonify({"images": images})
    