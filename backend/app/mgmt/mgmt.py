from flask import Blueprint, jsonify, session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


mgmt_bp = Blueprint("mgmt_bp", __name__)

@mgmt_bp.route('/profile', methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify(current_user)