from flask import Flask, render_template, request
from stories import stories

app = Flask(__name__)


@app.route('/')
def display_homepage():
    return render_template('/stories.html', story_list = stories.values())

@app.route('/questions')
def madlib_form():
    story_id = request.args['story_id']
    story = stories[story_id]
    prompts = story.prompts

    return render_template('/madlibs.html', story_id=story_id, title=story.title, words=prompts)

@app.route('/story')
def show_story():
    story_id = request.args['story_id']
    story = stories[story_id]
    words = request.args
    user_story = story.generate(words)
    return render_template('/story.html', story=user_story)
