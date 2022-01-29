from ast import Add
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField
from wtforms.validators import InputRequired, NumberRange, Optional, URL


class AddPetForm(FlaskForm):
    name = StringField('Name', validators=[
                       InputRequired(message='Pet must have a name')])
    species = SelectField('Species', choices=[
                          ('cat'), ('dog'), ('porcupine'), ('rabbit')])
    photo_url = StringField('Photo URL', validators=[
                            URL(message='Please enter a valid URL.'), Optional()])
    age = IntegerField('Age', validators=[NumberRange(
        min=0, max=30, message='Please enter an age between 0 and 30')])
    notes = StringField('Notes')
