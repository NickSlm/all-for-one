import os
import app.routes as routes
from flask_cors import CORS
from flask import Flask



app = Flask(__name__)

app.add_url_rule("/", view_func=routes.home)
app.add_url_rule("/signup", view_func=routes.signup)
app.add_url_rule("/login", view_func=routes.login)



if __name__ == "__main__":
    app.run(debug=True)
    