from app import app
from models import db, User, Feedback


db.drop_all()
db.create_all()

user_1 = User.register(
  username='Ralph57',
  password='password123',
  email='Ralph@gmail.com',
  first_name='Ralph',
  last_name='Johnson'
)

user_2 = User.register(
  username='therock',
  password='password123',
  email='therock@gmail.com',
  first_name='Dewayne',
  last_name='Johnson'
)

db.session.add_all([user_1, user_2])
db.session.commit()

feedback_1 = Feedback(
  title='My Feedback',
  content='Regarding my feedback, these are my thoughts...',
  username='Ralph57'
)

feedback_2 = Feedback(
  title='Bitcoin Fixes This',
  content='It may...or well it might. Think about it.',
  username='Ralph57'
)
feedback_3 = Feedback(
  title='Jumanji',
  content='This was a really fun movie to make. Kevin Hart is short.',
  username='therock'
)

feedback_4 = Feedback(
  title='Can You Smellalelelellll...',
  content='...what the rock, is cooking? New movie coming out soon!',
  username='therock'
)

db.session.add_all([feedback_1, feedback_2, feedback_3, feedback_4])
db.session.commit()