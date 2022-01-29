'''Seed file to make sample data for adopt db'''

from models import db, Pet
from app import app

db.drop_all()
db.create_all()

# Animals
Pet.query.delete()

pet1 = Pet(name='Millie', species='dog', photo_url='https://tinyurl.com/3fkmfxjv',
           age=3, notes='Shes the cutest!', available=True)

pet2 = Pet(name='Guiness', species='dog',
           photo_url='https://tinyurl.com/j5mw446z', age=5, available=True)

pet3 = Pet(name='Tux', species='cat', photo_url='https://tinyurl.com/mt8ek677',
           age=5, notes='Well, hes not the nicest...', available=True)

pet4 = Pet(name='Rabbi', species='rabbit',
           photo_url='https://tinyurl.com/2p8ecjmf', age=1, available=True)

db.session.add_all([pet1, pet2, pet3, pet4])
db.session.commit()
