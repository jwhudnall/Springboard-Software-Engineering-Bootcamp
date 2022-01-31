"""Flask app for Cupcakes"""
from flask import Flask, request, redirect, jsonify, render_template
from itsdangerous import json
from models import Cupcake, db, connect_db, add_and_jsonify
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
    '''Create a new cupcake. Returns result in JSON format.'''
    flavor = request.json.get('flavor')
    size = request.json.get('size')
    rating = request.json.get('rating')
    image = request.json.get('image', None)

    if not all([flavor, size, rating]):
        return '{"error": "flavor, size, rating are required"}'

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    response = add_and_jsonify(new_cupcake)
    return (response, 201)


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    '''Update a single cupcake. Returns result in JSON format'''
    c = Cupcake.query.get_or_404(cupcake_id)
    c.flavor = request.json.get('flavor', c.flavor)
    c.size = request.json.get('size', c.size)
    c.rating = request.json.get('rating', c.rating)
    c.image = request.json.get('image', c.rating)
    db.session.commit()
    return jsonify(cupcake=c.serialize())
