from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify, flash
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'easy-as-123'
debug = DebugToolbarExtension(app)

boggle_game = Boggle()
valid_words = boggle_game.read_dict('words.txt')

@app.route('/')
def show_board():
    board = Boggle.make_board(boggle_game)
    session['board'] = board
    return render_template('gameboard.html', board=board)

@app.route('/handle-guess', methods=["POST"])
def handle_guess():
    data = request.get_json(silent=True)
    guess = data.get('guess')
    board = session['board']
    on_board_res = boggle_game.check_valid_word(board, guess) # this method already checks if word in dict
    result = {"result": on_board_res}
    result_json = jsonify(result)
    return result_json