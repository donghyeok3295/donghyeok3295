from app.db import db

class Gallery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(50))
    year = db.Column(db.String(10))
    thumbnail = db.Column(db.String(255))

class GalleryImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gallery_id = db.Column(db.Integer, db.ForeignKey('gallery.id'), nullable=False)
    src = db.Column(db.String(255))
    caption = db.Column(db.String(255))

    gallery = db.relationship("Gallery", backref=db.backref("images", cascade="all, delete-orphan"))
