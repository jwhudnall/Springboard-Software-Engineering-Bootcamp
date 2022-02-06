"""User model tests."""

# run these tests like:
#
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


# Now we can import app
from app import app


# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data


class UserModelTestCase(TestCase):
    """Test views for users."""

    def setUp(self):
        """Create test client, add sample data."""
        db.drop_all()
        db.create_all()

        # User.query.delete()
        # Message.query.delete()
        # Follows.query.delete()
        # Likes.query.delete()

        u1 = User.signup(
            email="test1@test.com",
            username="testuser1",
            password="HASHED_PASSWORD",
            image_url=None
        )

        u2 = User.signup(
            email="test2@test.com",
            username="testuser2",
            password="HASHED_PASSWORD!",
            image_url=None
        )

        u3 = User.signup(
            email="test3@test.com",
            username="testuser3",
            password="HASHED_PASSWORD!",
            image_url=None
        )
        self.client = app.test_client()

        self.u1 = u1
        self.u2 = u2
        self.u3 = u3

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(self.u1.messages), 0)
        self.assertEqual(len(self.u1.followers), 0)
        self.assertEqual(
            self.u1.__repr__(), f"<User #{self.u1.id}: {self.u1.username}, {self.u1.email}>")

    def test_user_follows(self):
        """Do all follow methods work?"""
        self.u1.following.append(self.u2)
        db.session.add(self.u1)
        db.session.commit()
        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u1.is_following(self.u3))
        # Does is_followed_by successfully detect when user1 is followed by user2?
        self.assertTrue(self.u2.is_followed_by(self.u1))
        # Does is_followed_by successfully detect when user1 is not followed by user2?
        self.assertFalse(self.u1.is_followed_by(self.u2))

    def test_user_signup(self):
        """Does user signup work correctly?"""
        # Does User.create successfully create a new user given valid credentials?
        new_user = User.signup(
            username='randy67',
            email='randy@gmail.com',
            password='somethinghard',
            image_url='https://www.link-to-image.com'
        )
        self.assertIsInstance(new_user, User)
        # self.assertIsInstance(User.query.get(new_user.id), User)

    def test_raise_errors(self):
        """Are exceptions raised as expected?"""
        # Does User.create fail to create a new user if any of the validations (e.g. uniqueness, non-nullable fields) fail?
        self.assertRaises(IntegrityError, User.signup,
                          email="test1@test.com",
                          username="testuser1",
                          password="HASHED_PASSWORD",
                          image_url=None
                          )
        # Duplicate email
        self.assertRaises(InvalidRequestError, User.signup,
                          email="test1@test.com",
                          username="testuser1",
                          password="HASHED_PASSWORD",
                          image_url=None
                          )
        # Duplicate username
        self.assertRaises(InvalidRequestError, User.signup,
                          email="test1123@test.com",
                          username="testuser1",
                          password="HASHED_PASSWORD",
                          image_url=None
                          )

        self.assertRaises(TypeError, User.signup,
                          email="test1@test.com",
                          #   username="testuser1",
                          password="HASHED_PASSWORD",
                          image_url=None
                          )

        self.assertRaises(TypeError, User.signup,
                          #   email="test1@test.com",
                          username="testuser1",
                          password="HASHED_PASSWORD",
                          image_url=None
                          )

        self.assertRaises(TypeError, User.signup,
                          email="test1@test.com",
                          username="testuser1",
                          #   password="HASHED_PASSWORD",
                          image_url=None
                          )

    def test_user_authenticate(self):
        """Does User.authenticate function correctly?"""
        # Does User.authenticate successfully return a user when given a valid username and password?
        self.assertIsInstance((User.authenticate(
            username="testuser2", password="HASHED_PASSWORD!")), User)
        # Does User.authenticate fail to return a user when the username is invalid?
        self.assertFalse(User.authenticate(
            username="testuser2!", password="HASHED_PASSWORD!"))
        # Does User.authenticate fail to return a user when the password is invalid?
        self.assertFalse(User.authenticate(
            username="testuser2", password="WRONG_HASHED_PASSWORD!"))
