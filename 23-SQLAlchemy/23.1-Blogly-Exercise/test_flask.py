from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    '''Tests for views for Users'''

    def setUp(self):
        '''Add sample user.'''
        User.query.delete()

        user = User(first_name='Alan', last_name='Alda',
                    image_url='https://tinyurl.com/2p9yh95t')
        db.session.add(user)
        db.session.commit()
        self.id = user.id
        self.user = user

    def tearDown(self):
        '''Roll back any errant transactions.'''
        db.session.rollback()

    def test_show_homepage(self):
        '''Tests homepage'''
        with app.test_client() as client:
            res = client.get('/', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Alan', html)

    def test_show_users(self):
        '''Test show_users page.'''
        with app.test_client() as client:
            res = client.get('/users')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Alan', html)
            self.assertIn('Add user</button>', html)

    def test_create_user(self):
        '''Test create_user'''
        with app.test_client() as client:
            res = client.get('/users/new')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('action="/users/new"', html)
            self.assertIn('Create a User</h1>', html)
            self.assertIn('name="first-name"', html)
            self.assertIn('name="last-name"', html)
            self.assertIn('name="url"', html)
            self.assertIn('</button>', html)

    def test_add_user(self):
        '''Test add_user function'''
        data = {'first-name': 'Bob', 'last-name': 'Smith',
                'url': 'https://tinyurl.com/bdz4jevj'}
        with app.test_client() as client:
            res = client.post('/users/new', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Bob Smith', html)

    def test_show_user(self):
        '''Test show_user function'''
        with app.test_client() as client:
            res = client.get(f'/users/{self.id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(self.user.first_name, html)
            self.assertIn(self.user.last_name, html)
            self.assertIn(self.user.image_url, html)
