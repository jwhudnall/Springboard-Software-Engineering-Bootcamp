from flask import Flask, request, render_template, redirect, url_for, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not-very-secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = []
current_question = 1


@app.route('/')
def show_homepage():
    return render_template('/survey.html', survey=satisfaction_survey)


@app.route('/questions/<int:question_num>')
def render_question(question_num):

    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect('/thanks')

    if len(responses) != question_num :
        # flash('Please use the form to answer questions in order')
        flash('Please use the form to submit answers.')
        print('User flashed! AHH')
        return redirect(url_for('render_question', question_num=len(responses)))

    question = satisfaction_survey.questions[question_num]
    return render_template('/question.html', question=question, num=question_num)




@ app.route('/answer', methods=["POST"])
def handle_answer():
    # extract and handle form answer request.form
    question_num = int(request.form['q-num'])  # 1
    question_ans = request.form[f'q{question_num}-ans']
    responses.append(question_ans)

    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect('/thanks')

    else:
        return redirect(url_for('render_question', question_num=len(responses)))


@ app.route('/thanks')
def render_survey_complete():
    return render_template('/thanks.html')
