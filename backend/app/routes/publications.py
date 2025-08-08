from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from app.models.publication import Publication
from app import db
import os

bp = Blueprint("publications", __name__, url_prefix="/api/publications")

# ✅ GET: 논문 목록 조회
@bp.route("/", methods=["GET"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def get_publications():
    type_filter = request.args.get("type")
    query = Publication.query
    if type_filter:
        query = query.filter_by(type=type_filter)
    publications = query.order_by(Publication.year.desc()).all()
    return jsonify([
        {
            "id": p.id,
            "type": p.type,
            "title": p.title,
            "authors": p.authors,
            "year": p.year,
            "journal": p.journal,
            "volume": p.volume,
            "pages": p.pages,
            "doi": p.doi,
            "location": p.location,
            "date": p.date,
            "paper_url": p.paper_url,
            "image": p.image
        } for p in publications
    ])

# ✅ POST: 논문 등록 (OPTIONS 포함)
@bp.route("/", methods=["POST", "OPTIONS"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def create_publication():
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    data = request.get_json()
    required_fields = ["type", "title", "authors", "year"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "필수 항목이 누락되었습니다."}), 400

    publication = Publication(
        type=data["type"],
        title=data["title"],
        authors=data["authors"],
        year=data["year"],
        journal=data.get("venue", ""),
        volume=data.get("volume", ""),
        pages=data.get("pages", ""),
        doi=data.get("doi", ""),
        location=data.get("location", ""),
        date=data.get("date", ""),
        paper_url=data.get("paperUrl", ""),
        image=data.get("image", "")
    )

    db.session.add(publication)
    db.session.commit()

    return jsonify({
        "id": publication.id,
        "type": publication.type,
        "title": publication.title,
        "authors": publication.authors,
        "year": publication.year,
        "venue": publication.journal,
        "image": publication.image,
        "paperUrl": publication.paper_url,
        "doi": publication.doi,
        "volume": publication.volume,
        "pages": publication.pages,
        "location": publication.location,
        "date": publication.date
    }), 201

# ✅ DELETE: 논문 삭제 (OPTIONS 포함)
@bp.route("/<int:id>", methods=["DELETE", "OPTIONS"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def delete_publication(id):
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    pub = Publication.query.get(id)
    if not pub:
        return jsonify({"error": "Publication not found"}), 404

    # 이미지 삭제
    if pub.image:
        image_path = os.path.abspath(os.path.join("static", pub.image.lstrip("/static/")))
        if os.path.exists(image_path):
            try:
                os.remove(image_path)
                print(f"🗑 이미지 삭제됨: {image_path}")
            except Exception as e:
                print(f"⚠ 이미지 삭제 실패: {e}")

    db.session.delete(pub)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200
