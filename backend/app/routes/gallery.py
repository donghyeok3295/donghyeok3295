# app/routes/gallery.py

from flask import Blueprint, request, jsonify
from app.models.gallery import Gallery, GalleryImage
from app import db
import os

bp = Blueprint("gallery", __name__, url_prefix="/api/gallery")

# ✅ 전체 갤러리 조회
@bp.route("/", methods=["GET"], strict_slashes=False)
def get_gallery():
    galleries = Gallery.query.order_by(Gallery.date.desc()).all()
    result = []
    for g in galleries:
        result.append({
            "id": g.id,
            "title": g.title,
            "date": g.date,
            "year": g.year,
            "thumbnail": g.thumbnail,
            "images": [
                {"src": img.src, "caption": img.caption} for img in g.images
            ]
        })
    return jsonify(result)

# ✅ 갤러리 생성
@bp.route("/", methods=["POST"], strict_slashes=False)
def create_gallery():
    data = request.get_json()
    required_fields = ["title", "date", "year", "thumbnail", "images"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "필수 항목 누락"}), 400

    gallery = Gallery(
        title=data["title"],
        date=data["date"],
        year=data["year"],
        thumbnail=data["thumbnail"]
    )
    db.session.add(gallery)
    db.session.flush()  # gallery.id 확보

    for img in data["images"]:
        gallery_image = GalleryImage(
            gallery_id=gallery.id,
            src=img["src"],
            caption=img.get("caption", "")
        )
        db.session.add(gallery_image)

    db.session.commit()
    return jsonify({"message": "갤러리 등록 완료", "id": gallery.id}), 201

# ✅ 갤러리 삭제
@bp.route("/<int:gallery_id>", methods=["DELETE"], strict_slashes=False)
def delete_gallery(gallery_id):
    gallery = Gallery.query.get(gallery_id)
    if not gallery:
        return jsonify({"error": "갤러리를 찾을 수 없습니다."}), 404

    # 썸네일 삭제
    if gallery.thumbnail:
        thumb_path = os.path.abspath(gallery.thumbnail.lstrip("/"))
        if os.path.exists(thumb_path):
            try:
                os.remove(thumb_path)
            except:
                pass

    # 이미지 파일 삭제
    for img in gallery.images:
        if img.src:
            img_path = os.path.abspath(img.src.lstrip("/"))
            if os.path.exists(img_path):
                try:
                    os.remove(img_path)
                except:
                    pass

    db.session.delete(gallery)
    db.session.commit()
    return jsonify({"message": "갤러리 삭제 완료"}), 200
