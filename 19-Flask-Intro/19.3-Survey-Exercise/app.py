from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not-very-secret'

debug = DebugToolbarExtension(app)

responses = []

@app.route('/')
def show_homepage():
    return render_template('/survey.html', survey=satisfaction_survey)