from flask import Blueprint

mgmt_bp = Blueprint("mgmt_bp", __name__)


@mgmt_bp.route('/')
def home():
    return "Main Page!"
    
@mgmt_bp.route('/register')
def signup():
    return "Register Page!"
       
@mgmt_bp.route('/login')
def login():
    return "Login Page!"

