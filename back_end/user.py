from db_handler import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(80), unique=True, nullable=False)
    pw_hash = db.Column(db.String(80))
    username = db.Column(db.String(80))

    def __repr__(self):
        return f"{self.login} - {self.username}"