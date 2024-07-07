from flask import Blueprint, request, session
general_bp = Blueprint("general_bp", __name__)


@general_bp.route('/')
def home():
    print(session.items())
    return "Home Page!"
    
