from db_handler import db

class TaskList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('task_lists', lazy=True))

    def __repr__(self):
        return f"{self.title}"