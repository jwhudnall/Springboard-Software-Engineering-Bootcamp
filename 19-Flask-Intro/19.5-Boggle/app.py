from boggle import Boggle
from flask import Flask, request, render_template, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'easy-as-123'
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def show_board():
    # send board to template
    game = Boggle()
    board = Boggle.make_board(game)
    session['board'] = board

    return render_template('gameboard.html', board=board)