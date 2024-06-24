from flask import Blueprint
from database import get_db_name

general_bp = Blueprint("general_bp", __name__)


@general_bp.route('/')
def home():
    db_name = get_db_name()
    return {
        "db_name": db_name
    }
    
@general_bp.route('/register')
def signup():
    return "Register Page!"
       
@general_bp.route('/login')
def login():
    return "Login Page!"

