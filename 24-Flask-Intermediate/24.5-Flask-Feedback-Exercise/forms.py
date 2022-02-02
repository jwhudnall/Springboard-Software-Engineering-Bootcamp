from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import InputRequired, Email, Length
import email_validator


class RegisterUser(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(
        min=1, max=20, message='Username must be between 1 and 20 characters.')])
    password = PasswordField('Password', validators=[InputRequired()])
    email = StringField('Email', validators=[
        Email(message='Please enter a valid email'),
        InputRequired(),
        Length(min=1, max=50, message='Email must be between 1 and 50 characters.')])
    first_name = StringField('First Name', validators=[
        InputRequired(),
        Length(min=1, max=30, message='Must be between 1 and 30 characters.')
    ])
    last_name = StringField('Last Name', validators=[
        InputRequired(),
        Length(min=1, max=30, message='Must be between 1 and 30 characters.')
    ])


class LoginUser(FlaskForm):
    username = StringField('Username', validators=[
                           InputRequired(), Length(min=1, max=20)])
    password = PasswordField('Password', validators=[InputRequired()])


class FeedbackForm(FlaskForm):
    title = StringField('Title', validators=[InputRequired(), Length(
        min=1, max=100, message='Title must be between 1 and 100 characters.')])
    content = TextAreaField('Content', validators=[InputRequired()])
