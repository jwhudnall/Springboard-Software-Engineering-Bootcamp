"""Blogly application."""

from crypt import methods
from flask import Flask, request, render_template, redirect, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = str(os.environ.get('FLASK_SECRET_KEY'))
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/')
def show_homepage():
    '''Show homepage'''
    return redirect('/users')


@app.route('/users')
def show_users():
    '''Show list of users'''
    # users = User.query.all()
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users.html', users=users)


@app.route('/users/new')
def create_user():
    '''Render form to create new user'''
    return render_template('create-user.html')


@app.route('/users/new', methods=['POST'])
def add_user():
    '''Create user from form inputs. Update list and database.'''
    first = request.form['first-name']
    last = request.form['last-name']
    url = request.form['url'] or None
    user = User(first_name=first, last_name=last, image_url=url)

    db.session.add(user)
    db.session.commit()

    return redirect('/')


@app.route('/users/<int:user_id>')
def show_user(user_id):
    '''Show user details page'''
    user = User.query.get(user_id)
    posts = Post.query.filter(Post.user_id == user_id).all()
    return render_template('user-details.html', user=user, posts=posts)


@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    '''Render form to edit user'''
    user = User.query.get(user_id)
    return render_template('edit-user.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=['POST'])
def update_user(user_id):
    '''Update users information on site and in database'''
    first = request.form.get('first-name')
    last = request.form.get('last-name')
    url = request.form.get('url')

    user = User.query.get(user_id)
    user.first_name = first
    user.last_name = last
    user.image_url = url
    db.session.add(user)
    db.session.commit()
    return redirect(f'/users/{user_id}')


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    '''Delete user from site and database.'''
    user = User.query.get(user_id)
    # print(f'User: {user}')
    db.session.delete(user)
    db.session.commit()
    return redirect('/')


@app.route('/users/<int:user_id>/posts/new')
def render_post_form(user_id):
    '''Render form to create new post.'''
    user = User.query.get_or_404(user_id)
    return render_template('create-post.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def add_post(user_id):
    '''Add post attributed to user.'''
    title = request.form['title']
    post = request.form['post']
    new_post = Post(title=title, content=post, user_id=user_id)
    db.session.add(new_post)
    db.session.commit()
    return redirect(f'/users/{user_id}')

# Post Routes


@app.route('/posts/<int:post_id>')
def display_post(post_id):
    '''Show single post, along with buttons to cancel, edit or delete post.'''
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', post=post)
