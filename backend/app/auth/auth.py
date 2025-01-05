from flask_jwt_extended import create_access_token, create_refresh_token, unset_jwt_cookies, get_jwt, get_jwt_identity, jwt_required
from flask import Blueprint, request, session, jsonify, make_response
from database import create_user, check_if_exists, authorization

auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route('/register', methods=["POST"])
def signup():
    
    emailAddress = request.json["emailAddress"]
    password = request.json["password"]
    firstName = request.json["firstName"]
    lastName = request.json["lastName"]
    
    if check_if_exists(emailAddress):
        return jsonify({"error": "This Email is already in use"}), 200
    
    create_user(emailAddress, password, firstName, lastName)
    return jsonify({"emailAddress": emailAddress}), 200
       
@auth_bp.route('/login', methods=["POST"])
def login():
    emailAddress = request.json["emailAddress"]
    password = request.json["password"]
    if not check_if_exists(emailAddress):
        return jsonify({"msg": "user does not exist"}), 401
    
    if authorization(emailAddress, password):
        access_token = create_access_token(identity=emailAddress)
        refresh_token = create_refresh_token(identity=emailAddress)
        response = {"access_token": access_token,
                    "refresh_token": refresh_token,
                    "user": emailAddress}
        return response
    else:
        return jsonify({"msg": "Invalid Credentials"}), 401

@auth_bp.route('/logout', methods=["POST"])
def logout():
    resp = jsonify({"msg": "logout Successful"})
    unset_jwt_cookies(resp)
    return resp


@auth_bp.route('/refresh', methods=["POST", "GET"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity, fresh=False)
    response = jsonify(access_token=access_token)
    return response