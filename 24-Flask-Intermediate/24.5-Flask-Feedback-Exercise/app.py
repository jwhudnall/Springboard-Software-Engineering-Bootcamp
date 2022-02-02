from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User
from forms import RegisterUser, LoginUser
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
    return redirect('/register')


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
        # Add logic to prevent duplicate usernames
        db.session.commit()
        session['username'] = new_user.username
        flash('Account successfully registered.')
        return redirect('/secret')
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
            flash('Invalid credentials.')
            return redirect('/login')

    return render_template('login.html', form=form)


@app.route('/users/<username>')
def user_details(username):
    if 'username' not in session:
        flash('Please Login')
        return redirect('/login')
    user = User.query.get_or_404(username)
    cur_username = session.get('username')
    if user.username == cur_username:
        return render_template('user-details.html', user=user)
    elif 'username' in session:
        return redirect(f'/users/{cur_username}')

    flash('You don\'t have permission to do that.')
    return redirect('/login')


@app.route('/secret')
def show_secret():
    return render_template('secret.html')


@app.route('/logout')
def logout_user():
    if session.get('username'):
        session.pop('username')
        flash('Successfully logged out.')
        return redirect('/')
    return redirect('/')
