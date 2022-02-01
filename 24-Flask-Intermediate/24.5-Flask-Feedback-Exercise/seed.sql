from app import app
from models import db, User

DROP DATABASE IF EXISTS flask_feedback;
CREATE DATABASE flask_feedback;

db.drop_all()
db.create_all()

-- u1 = User(username='monkeyguy1', password)