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
    '''Show game screen'''
    board = Boggle.make_board(boggle_game)
    session['board'] = board
    return render_template('gameboard.html', board=board)

@app.route('/handle-guess', methods=['POST'])
def handle_guess():
    '''Handle a guessed word'''
    # import pdb
    # pdb.set_trace()
    guess = request.json.get('guess')
    board = session['board']
    on_board_res = boggle_game.check_valid_word(board, guess) # this method already checks if word in dict
    result = {"result": on_board_res}
    result_json = jsonify(result)
    return result_json

@app.route('/update-user-stats', methods=['POST'])
def update_user_stats():
    '''Update user game stats'''
    session['games-played'] = session.get('games-played', 0) + 1
    high_score = session.get('high-score', 0)
    current_score = int(request.json.get('score'))
    if current_score > high_score:
        session['high-score'] = current_score

    return jsonify(session['high-score'])