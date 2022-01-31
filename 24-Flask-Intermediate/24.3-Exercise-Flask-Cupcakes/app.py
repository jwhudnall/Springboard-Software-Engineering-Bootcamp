"""Flask app for Cupcakes"""
from flask import Flask, request, redirect, jsonify, render_template
from itsdangerous import json
from models import Cupcake, db, connect_db
from configuration import FLASK_SECRET

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = FLASK_SECRET

connect_db(app)


@app.route('/api/cupcakes')
def display_all_cupcakes():
    '''Return information about all cupcakes in JSON format.'''
    cupcakes = [c.serialize() for c in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


@app.route('/api/cupcakes/<int:cupcake_id>')
def display_single_cupcake(cupcake_id):
    '''Return information about a single cupcake in JSON format.'''
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize())


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    '''Create a new cupcake.'''
    flavor = request.json.get('flavor')
    size = request.json.get('size')
    rating = request.json.get('rating')
    image = request.json.get('image', None)

    if not all([flavor, size, rating]):
        return '{"error": "flavor, size, rating are required"}'

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    response = jsonify(cupcake=new_cupcake.serialize())
    return (response, 201)
