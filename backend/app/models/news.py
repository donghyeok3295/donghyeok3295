# app/models/news.py
from app.db import db
from datetime import datetime

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    featured = db.Column(db.Boolean, default=False)
    image = db.Column(db.String(255))
    content = db.Column(db.Text)
