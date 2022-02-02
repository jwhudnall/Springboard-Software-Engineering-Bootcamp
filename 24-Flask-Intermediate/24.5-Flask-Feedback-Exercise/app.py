from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterUser, LoginUser, FeedbackForm
from sqlalchemy.exc import IntegrityError
from config import FLASK_KEY


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = FLASK_KEY
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True


connect_db(app)
toolbar = DebugToolbarExtension(app)


@app.route('/')
def home_page():
    return redirect('/login')


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    form = RegisterUser()
    if form.validate_on_submit():
        new_user = User.register(
            username=form.username.data,
            password=form.password.data,
            email=form.email.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data
        )
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username already exists.')
            return render_template('register.html', form=form)
        session['username'] = new_user.username
        flash('Account successfully registered.')
        return redirect(f'/users/{new_user.username}')
    elif 'username' in session:
        username = session['username']
        return redirect(f'/users/{username}')
    else:
        return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_user():
    form = LoginUser()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            flash('You have been logged in.')
            session['username'] = username
            return redirect(f'/users/{username}')
        else:
            flash('Account not found.')
            return redirect('/login')
    elif 'username' in session:
        username = session['username']
        return redirect(f'/users/{username}')
    else:
        return render_template('login.html', form=form)


@app.route('/users/<username>')
def user_details(username):
    if 'username' not in session:
        flash('Please Login')
        return redirect('/login')
    user = User.query.get_or_404(username)
    cur_username = session.get('username')
    if user.username == cur_username:
        feedback = user.feedback
        return render_template('user-details.html', user=user, feedback=feedback)
    elif 'username' in session:
        return redirect(f'/users/{cur_username}')

    flash('You don\'t have permission to do that.')
    return redirect('/login')


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'username' not in session:
        flash('You must be logged in.')
        return redirect('/login')
    user = User.query.get_or_404(username)
    if user.username == session['username']:
        db.session.delete(user)
        db.session.commit()
        session.pop('username')
        flash('Account successfully deleted.')
        return redirect('/')
    flash('You don\'t have permission to do that')
    return redirect('/')


@app.route('/logout')
def logout_user():
    if session.get('username'):
        session.pop('username')
        flash('Successfully logged out.')
        return redirect('/')
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def handle_feedback(username):
    form = FeedbackForm()
    if 'username' not in session:
        flash('You must be logged in and authenticated to post feedback.')
        return redirect('/')

    elif session['username'] == username and form.validate_on_submit():
        # Handle Post Request
        title = form.title.data
        content = form.content.data
        new_fb = Feedback(title=title, content=content, username=username)
        db.session.add(new_fb)
        db.session.commit()
        flash('Feedback added.')
        return redirect(f'/users/{username}')

    elif session['username'] == username:
        # Handle GET request
        return render_template('feedback-form.html', form=form)

    else:
        flash('You aren\'t authorized to do that.')
        return redirect('/')


@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    fb = Feedback.query.get_or_404(feedback_id)
    form = FeedbackForm(obj=fb)

    if 'username' not in session:
        flash('You must be logged in and authenticated to post feedback.')
        return redirect('/')

    user = fb.user
    if session['username'] == user.username and form.validate_on_submit():
        # Handle POST request
        fb.title = form.title.data
        fb.content = form.content.data
        db.session.commit()
        return redirect(f'/users/{user.username}')

    elif session['username'] == user.username:
        # Handle GET request
        return render_template('feedback-form.html', form=form)

    else:
        flash('You aren\'t authorized to do that.')
        return redirect('/')


@app.route('/feedback/<feedback_id>/delete', methods=['POST'])
def delete_fb(feedback_id):
    fb = Feedback.query.get_or_404(feedback_id)
    username = fb.user.username
    if 'username' not in session:
        flash('You must be logged in and authenticated to do that.')
        return redirect('/')
    elif session['username'] == username:
        db.session.delete(fb)
        db.session.commit()
        flash('Feedback Deleted.')
        return redirect(f'/users/{username}')
    else:
        flash('You aren\'t authorized to do that.')
        return redirect('/')
