'''Seed file to make sample data for blogly db'''

from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

alan = User(first_name='Alan', last_name='Alda',
            image_url='https://tinyurl.com/2p9yh95t')
joel = User(first_name='Joel', last_name='Burton',
            image_url='https://tinyurl.com/nb4vew2n')
jane = User(first_name='Jane', last_name='Smith',
            image_url='https://tinyurl.com/2jwvsu5p')


db.session.add_all([alan, joel, jane])
db.session.commit()
