from flask import Blueprint, request, session
home_bp = Blueprint("home_bp", __name__)


@home_bp.route('/')
def home():
    print(session.items())
    return "Home Page!"
    
