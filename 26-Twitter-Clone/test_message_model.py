"""User model tests."""
# run these tests like:
#    python -m unittest test_user_model.py



from sqlalchemy.exc import IntegrityError, InvalidRequestError
import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database
os.environ['DATABASE_URL'] = "postgresql:///warbler-test"
from app import app


class MessageModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        db.drop_all()
        db.create_all()

        u1 = User.signup(
            email="test1@test.com",
            username="testuser1",
            password="HASHED_PASSWORD",
            image_url=None
        )

        u2 = User.signup(
            email="test2@test.com",
            username="testuser2",
            password="HASHED_PASSWORD",
            image_url=None
        )

        msg1 = Message(text='Test message 1.', user_id=u1.id)
        msg2 = Message(text='Test message 2.', user_id=u1.id)

        self.u1 = u1
        self.u2 = u2
        self.client = app.test_client()

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()
        return super().tearDown()

    def test_message_model(self):
        """Does basic model work?"""
        msg = Message(
            text='Hey!',
            user_id=self.u1.id
        )
        db.session.add(msg)
        db.session.commit()

        self.assertIsInstance(msg, Message)
        self.assertEqual(msg.user, self.u1)
        self.assertEqual(len(self.u1.messages), 1)
        self.assertEqual(self.u1.messages[0].text, "Hey!")

    def test_message_likes(self):
        """Are message likes working?"""
        msg = Message(
            text="I like that!",
            user_id=self.u1.id
        )

        db.session.add(msg)
        db.session.commit()

        self.u2.likes.append(msg)
        self.assertEqual(len(self.u2.likes), 1)
        # User shouldn't be able to like their own message
        with self.assertRaises(IntegrityError):
            self.u1.likes.append(msg)
            db.session.add(self.u1)
            db.session.commit()
