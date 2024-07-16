from flask import Flask, request
from flask_session import Session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt, set_access_cookies
from flask_cors import CORS
from auth.auth  import auth_bp
from general.general import general_bp
from mgmt.mgmt import mgmt_bp
from models import jwt
from config import SECRET_KEY
from datetime import timedelta


app = Flask(__name__)
app.config["SECRET_KEY"] = SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=4)
jwt.init_app(app)
CORS(app, supports_credentials=True)

app.register_blueprint(auth_bp)
app.register_blueprint(general_bp)
app.register_blueprint(mgmt_bp)


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
