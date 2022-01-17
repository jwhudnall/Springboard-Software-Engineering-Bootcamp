from flask import Flask, request, render_template, redirect, url_for
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not-very-secret'

debug = DebugToolbarExtension(app)

responses = []

@app.route('/')
def show_homepage():
    return render_template('/survey.html', survey=satisfaction_survey)

@app.route('/questions/<int:question_num>')
def render_question(question_num):
    question = satisfaction_survey.questions[question_num]
    return render_template('/question.html', question=question, num=question_num)

@app.route('/answer', methods=["POST"])
def handle_answer():
    # extract and handle form answer request.form
    # q0-ans AND q-num returns submitted question number (0)
    question_num = int(request.form['q-num'])
    question_ans = request.form[f'q{question_num}-ans']
    responses.append(question_ans)
    next_q_idx = question_num + 1

    if next_q_idx < len(satisfaction_survey.questions):
        return redirect(url_for('render_question',question_num=next_q_idx))
    else:
        return redirect('/thanks')

@app.route('/thanks')
def render_survey_complete():
    return render_template('/thanks.html')