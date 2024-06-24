import os
from flask import Flask, request, session
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from auth.auth  import auth_bp
from general.general import general_bp
from mgmt.mgmt import mgmt_bp

app = Flask(__name__)


app.register_blueprint(general_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(mgmt_bp)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
