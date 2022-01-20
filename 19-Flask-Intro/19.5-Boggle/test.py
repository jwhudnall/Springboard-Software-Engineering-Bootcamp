from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle
import json



class FlaskTests(TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

    def test_root_route(self):
        '''Check session values, along with HTML'''
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('games-played'))
            self.assertIn('<p>High Score:', html)

    def test_handle_guess(self):
        '''Check guess query to server'''
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [["c", "a", "t", "T", "T"],
                                 ["C", "A", "T", "T", "T"],
                                 ["C", "A", "T", "T", "T"],
                                 ["C", "A", "T", "T", "T"],
                                 ["C", "A", "T", "T", "T"]]
            res = client.get('/handle-guess?guess=cat')

            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['result'], 'ok')

