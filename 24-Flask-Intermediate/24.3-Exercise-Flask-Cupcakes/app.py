"""Flask app for Cupcakes"""
from flask import Flask, request, redirect, jsonify, render_template
from models import Cupcake, db, connect_db
from configuration import FLASK_SECRET

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = FLASK_SECRET

connect_db(app)
