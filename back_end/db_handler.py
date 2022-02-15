from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import secrets

private_key = secrets.token_hex()

app = Flask(__name__)
app.config.update(
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db',
    SECRET_KEY = private_key
)
db = SQLAlchemy(app)

def init_db():
    db.create_all()

if __name__ == '__main__':
    init_db()