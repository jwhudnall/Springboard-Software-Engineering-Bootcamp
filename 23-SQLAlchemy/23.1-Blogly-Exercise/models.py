"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    '''Define User model'''
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    first_name = db.Column(db.String(25),
                           nullable=False)

    last_name = db.Column(db.String(25),
                          nullable=False)

    image_url = db.Column(db.String(250),
                          nullable=False,
                          default='https://tinyurl.com/yc2rkm4z')

    def __repr__(self):
        u = self
        return f'<User id={u.id} first_name={u.first_name} last_name={u.last_name} img_url={u.image_url}>'

    def get_full_name(self):
        '''Returns a users first and last name'''
        return f'{self.first_name} {self.last_name}'
