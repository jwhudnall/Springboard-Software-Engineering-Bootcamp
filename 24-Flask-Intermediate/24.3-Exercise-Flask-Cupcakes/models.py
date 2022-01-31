"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    ''''Cupcake Model'''

    __tablename__ = 'cupcakes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False,
                      default='https://tinyurl.com/demo-cupcake')

    def serialize(self):
        '''Serialize SQLAlchemy model into JSON'''
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }


def add_and_jsonify(cupcake):
    '''Adds an instance of Cupcake to the db. Returns cupcake information in JSON.'''
    db.session.add(cupcake)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())
