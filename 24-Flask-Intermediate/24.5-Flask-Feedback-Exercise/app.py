from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db
from config import FLASK_KEY


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = FLASK_KEY
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)
toolbar = DebugToolbarExtension(app)
