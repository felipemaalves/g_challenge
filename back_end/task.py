from db_handler import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(120), nullable=False)
    priority = db.Column(db.Integer)

    task_list_id = db.Column(db.Integer, db.ForeignKey('task_list.id'), nullable=False)
    task_list = db.relationship('TaskList', backref=db.backref('tasks', lazy=True))

    def __repr__(self):
        return f"{self.description}"