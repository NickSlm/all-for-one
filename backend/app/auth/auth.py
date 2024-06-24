from flask import Blueprint
from pymongo import ReturnDocument

auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route('/')
def home():
    return "Main Page! asdf"
    
@auth_bp.route('/register')
def signup():
    return "Register Page!"
       
@auth_bp.route('/login')
def login():
    return "Login Page!"

