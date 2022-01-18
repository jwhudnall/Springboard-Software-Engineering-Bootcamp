from flask import Flask, request, render_template, redirect, url_for, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not-very-secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def show_homepage():
    return render_template('/survey-form.html', surveys=surveys)

@app.route('/start-survey', methods=['POST'])
def handle_form():
    survey_name = request.form.get('survey-name', None)
    session['survey_name'] = survey_name
    return redirect(f'/surveys/{survey_name}')
    # check if name exists as a survey? if not, redirect? Shouldn't need
    # due to list selection?

@app.route('/surveys/<survey_name>')
def survey_start(survey_name):
    # add session cookie for survey key
    session['responses'] = []
    survey = surveys[survey_name]
    return render_template('/survey.html', survey=survey)


@app.route('/questions/<int:question_num>', methods=['GET', 'POST'])
def render_question(question_num):
    responses = session['responses']
    # survey = session['survey_obj']
    survey_name = session['survey_name']
    survey = surveys[survey_name]

    if (len(responses) == len(survey.questions)):
        return redirect('/thanks')

    if len(responses) != question_num :
        flash('Please use the form to submit answers.')
        return redirect(url_for('render_question', question_num=len(responses)))

    question = survey.questions[question_num]
    return render_template('/question.html', question=question, num=question_num)



@ app.route('/answer', methods=["POST"])
def handle_answer():
    # extract and handle form answer request.form
    question_num = int(request.form['q-num'])  # 1
    question_ans = request.form[f'q{question_num}-ans']
    survey_name = session['survey_name']
    survey = surveys[survey_name]

    responses = session['responses']
    responses.append(question_ans)
    session['responses'] = responses

    if (len(responses) == len(survey.questions)):
        return redirect('/thanks')

    else:
        return redirect(url_for('render_question', question_num=len(responses)))


@ app.route('/thanks')
def render_survey_complete():
    return render_template('/thanks.html')