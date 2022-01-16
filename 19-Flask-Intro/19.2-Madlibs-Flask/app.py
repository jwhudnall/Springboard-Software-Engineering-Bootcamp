from flask import Flask, render_template, request
from stories import story

app = Flask(__name__)


@app.route('/')
def madlib_form():
    words = story.prompts
    return render_template('/madlibs.html', words=words)


@app.route('/story')
def show_story():
    words = request.args
    user_story = story.generate(words)
    return render_template('/story.html', story=user_story)
