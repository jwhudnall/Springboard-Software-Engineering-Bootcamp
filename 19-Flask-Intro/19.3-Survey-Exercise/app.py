from flask import Flask, request, render_template, redirect, url_for, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not-very-secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def show_homepage():
    session['responses'] = []
    return render_template('/survey.html', survey=satisfaction_survey)


@app.route('/questions/<int:question_num>', methods=['GET', 'POST'])
def render_question(question_num):
    responses = session['responses']

    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect('/thanks')

    if len(responses) != question_num :
        flash('Please use the form to submit answers.')
        return redirect(url_for('render_question', question_num=len(responses)))

    question = satisfaction_survey.questions[question_num]
    return render_template('/question.html', question=question, num=question_num)



@ app.route('/answer', methods=["POST"])
def handle_answer():
    # extract and handle form answer request.form
    question_num = int(request.form['q-num'])  # 1
    question_ans = request.form[f'q{question_num}-ans']

    responses = session['responses']
    responses.append(question_ans)
    session['responses'] = responses

    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect('/thanks')

    else:
        return redirect(url_for('render_question', question_num=len(responses)))


@ app.route('/thanks')
def render_survey_complete():
    return render_template('/thanks.html')