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

db.session.add(user_1)
db.session.commit()

feedback_1 = Feedback(
  title='My Feedback',
  content='Regarding my feedback, these are my thoughts...',
  username='Ralph57'
)

db.session.add(feedback_1)
db.session.commit()