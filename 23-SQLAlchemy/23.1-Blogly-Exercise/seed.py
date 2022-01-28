'''Seed file to make sample data for blogly db'''

from models import User, Post, db, Tag, PostTag
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
post1 = Post(title='Crazy Times Ahead!',
             content='These are crazy times! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita, quo praesentium saepe architecto quae assumenda impedit eveniet recusandae at eum, quod molestias! Totam asperiores nobis ad praesentium numquam accusamus.',
             user=alan)
post2 = Post(title='What a world',
             content='What a world we live in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita, quo praesentium saepe architecto quae assumenda impedit eveniet recusandae at eum, quod molestias! Totam asperiores nobis ad praesentium numquam accusamus.',
             user=joel)
post3 = Post(title='Oh, what a night!',
             content='What a night it was indeed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita, quo praesentium saepe architecto quae assumenda impedit eveniet recusandae at eum, quod molestias! Totam asperiores nobis ad praesentium numquam accusamus.',
             user=jane)
post4 = Post(title='Merry Christmas!',
             content='Its that time of the year! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita, quo praesentium saepe architecto quae assumenda impedit eveniet recusandae at eum, quod molestias! Totam asperiores nobis ad praesentium numquam accusamus.',
             user=jane)
post5 = Post(title='Giving Thanks',
             content='Hey everyone, this is my first post! I just wanted to thank you all, from the bottom of my heart.',
             user=jane)

db.session.add_all([post1, post2, post3, post4, post5])
db.session.commit()

# Tags

tag1 = Tag(name='Trending')
tag2 = Tag(name='Seasonal')
tag3 = Tag(name='Bitcoin')

db.session.add_all([tag1, tag2, tag3])
db.session.commit()

# PostTags
pt1 = PostTag(post_id=1, tag_id=1)
pt2 = PostTag(post_id=1, tag_id=2)
pt3 = PostTag(post_id=2, tag_id=3)

db.session.add_all([pt1, pt2, pt3])
db.session.commit()
