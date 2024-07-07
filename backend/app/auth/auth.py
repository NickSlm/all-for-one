from flask_jwt_extended import create_access_token, create_refresh_token, unset_jwt_cookies
from flask import Blueprint, request, session, jsonify, make_response
from database import create_user, check_if_exists, authorization

auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route('/register', methods=["POST"])
def signup():
    username = request.json["username"]
    password = request.json["password"]
    if check_if_exists(username):
        return jsonify({"error": "Username already exists"}), 200
    
    create_user(username, password)
    return jsonify({"username": username}), 200
       
@auth_bp.route('/login', methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    if not check_if_exists(username):
        return jsonify({"error": "user does not exist"}), 401
    
    if authorization(username, password):
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        return jsonify({"username": username,
                        "access_token": access_token,
                        "refresh_token": refresh_token}), 200
    else:
        return jsonify({"error": "Invalid Credentials"}), 401

@auth_bp.route('/logout', methods=["POST"])
def logout():
    resp = jsonify({"msg": "logout Successful"})
    unset_jwt_cookies(resp)
    return resp

