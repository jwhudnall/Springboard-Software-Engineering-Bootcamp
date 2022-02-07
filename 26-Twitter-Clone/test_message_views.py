"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY
app.config['TESTING'] = True
# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data



# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        self.testuser1 = User.signup(username="testuser1",
                                    email="test1@test.com",
                                    password="testuser1",
                                    image_url=None)
        self.testuser1.id = 1

        self.testuser2 = User.signup(username="testuser2",
                                    email="test2@test.com",
                                    password="testuser2",
                                    image_url=None)
        self.testuser2.id = 2
        db.session.commit()

    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

    def test_view_followers_logged_in(self):
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1.id

            resp = c.get("/users/2/followers", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Follow</button>', html)


    def test_view_following_logged_in(self):
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1.id

            resp = c.get("/users/2/following", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Follow</button>', html)


    def test_view_followers_logged_out(self):
        with self.client as c:
            resp = c.get("/users/2/followers", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))


    def test_view_following_logged_out(self):
        with self.client as c:
            resp = c.get("/users/2/following", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))


    def test_new_message_views_get(self):
        with self.client as c:
            resp = c.get("/messages/new", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))


    def test_new_message_views_post(self):
        with self.client as c:
            resp = c.post("/messages/new", data={"text": "Hello"}, follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))


    def test_delete_message_logged_in(self):
        msg = Message(
            id=9999,
            text='Hey There!',
            user_id=self.testuser1.id
        )
        db.session.add(msg)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1.id

            resp = c.post("/messages/9999/delete", follow_redirects=True)

            self.assertEqual(resp.status_code, 200)
            msg = Message.query.get(9999)
            self.assertIsNone(msg)


    def test_delete_message_logged_out(self):
        msg = Message(
            id=9999,
            text='Hey There!',
            user_id=self.testuser1.id
        )
        db.session.add(msg)
        db.session.commit()

        with self.client as c:
            resp = c.post("/messages/9999/delete", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))

    def test_prohibit_delete_message_as_another_user(self):
        msg = Message(
            id=8888,
            text='Hey There!',
            user_id=self.testuser1.id
        )
        db.session.add(msg)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser2.id

            resp = c.post(
                "/messages/8888/delete",
                follow_redirects=True
            )

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Access unauthorized", str(resp.data))


