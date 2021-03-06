from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify, flash
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'easy-as-123'
debug = DebugToolbarExtension(app)

boggle_game = Boggle()
# valid_words = boggle_game.read_dict('words.txt')

@app.route('/')
def show_board():
    '''Show game screen'''
    board = boggle_game.make_board()
    session['board'] = board
    high_score = session.get('high-score', 0)
    games_played = session.get('games-played', 0)
    return render_template('gameboard.html', board=board,
    high_score=high_score, games_played=games_played)

@app.route('/handle-guess')
def handle_guess():
    '''Handle a guessed word'''
    guess = request.args.get('guess')
    board = session['board']
    on_board_res = boggle_game.check_valid_word(board, guess) # this method already checks if word in dict
    result = {"result": on_board_res}
    return jsonify(result)

@app.route('/update-user-stats', methods=['POST'])
def update_user_stats():
    '''Receive high score POST request. Update games-played, high
    score (if applicable)'''

    session['games-played'] = session.get('games-played', 0) + 1
    high_score = session.get('high-score', 0)
    current_score = int(request.json.get('score'))
    if current_score > high_score:
        session['high-score'] = current_score

    return jsonify(session.get('high-score'))