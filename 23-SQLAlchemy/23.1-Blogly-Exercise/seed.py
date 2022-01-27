'''Seed file to make sample data for blogly db'''

from models import User, Post, db
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

# Posts

# post1 = Post(title='My First Post',
#              content='Hey everyone, this is my first post!',
#              user_id=1)
# post2 = Post(title='My First Post',
#              content='Hey everyone, this is my first post!',
#              user_id=2)
# post3 = Post(title='My First Post',
#              content='Hey everyone, this is my first post!',
#              user_id=3)
post1 = Post(title='My First Post',
             content='Hey everyone, this is my first post!',
             user=alan)
post2 = Post(title='My First Post',
             content='Hey everyone, this is my first post!',
             user=joel)
post3 = Post(title='My First Post',
             content='Hey everyone, this is my first post!',
             user=jane)

db.session.add_all([post1, post2, post3])
db.session.commit()
