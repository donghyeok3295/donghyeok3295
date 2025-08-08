from app.db import db

class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # researcher | alumni
    image = db.Column(db.String(255))
    email = db.Column(db.String(100))
    github = db.Column(db.String(255))
    research = db.Column(db.String(255))


    graduation = db.Column(db.String(50))           # alumni 전용
    current_position = db.Column(db.String(100))    # alumni 전용
