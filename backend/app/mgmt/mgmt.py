from flask import Blueprint, jsonify, session,request, send_file
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies
from datetime import datetime, timedelta, timezone
from models import generate_image
import json

mgmt_bp = Blueprint("mgmt_bp", __name__)


@mgmt_bp.after_request
def refresh_expiring_jwts(response):
    try:
        print("refreshing")
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=5))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response
    
@mgmt_bp.route('/profile', methods=["GET"])
@jwt_required()
def profile():
    
    response_body = {
        "username": get_jwt_identity()
    }
    return response_body


@mgmt_bp.route('/profile/gen-image', methods=["GET"])
@jwt_required()
def gen_image():
    image = generate_image()
    return send_file(image, mimetype='image/jpeg')
    
    