from app.db import db

class Publication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), nullable=False)  # 'Journal' or 'Conference'
    title = db.Column(db.Text, nullable=False)
    authors = db.Column(db.String(255), nullable=False)
    year = db.Column(db.String(4), nullable=False)
    journal = db.Column(db.String(255))
    volume = db.Column(db.String(50))
    pages = db.Column(db.String(50))
    doi = db.Column(db.String(100))
    location = db.Column(db.String(100))  # conference 전용
    date = db.Column(db.String(50))       # conference 전용
    paper_url = db.Column(db.String(255))
    image = db.Column(db.String(255))