# app/routes/news.py

from flask import Blueprint, request, jsonify
from app.models.news import News
from app import db
import os

bp = Blueprint("news", __name__, url_prefix="/api/news")

# ✅ GET: 뉴스 목록 조회
@bp.route("/", methods=["GET"], strict_slashes=False)
def get_news():
    news_list = News.query.order_by(News.date.desc()).all()
    return jsonify([{
        "id": n.id,
        "title": n.title,
        "summary": n.summary,
        "date": n.date,
        "author": n.author,
        "category": n.category,
        "featured": n.featured,
        "image": n.image
    } for n in news_list])

# ✅ POST: 뉴스 추가
@bp.route("/", methods=["POST", "OPTIONS"], strict_slashes=False)
def create_news():
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    data = request.get_json()

    # 필수 항목 체크
    required_fields = ["title", "summary", "date", "author", "category"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "필수 필드가 누락되었습니다."}), 400

    # 뉴스 객체 생성
    news = News(
        title=data["title"],
        summary=data["summary"],
        date=data["date"],
        author=data["author"],
        category=data["category"],
        featured=data.get("featured", False),
        image=data.get("image")
    )
    db.session.add(news)
    db.session.commit()

    return jsonify({
        "id": news.id,
        "title": news.title,
        "summary": news.summary,
        "date": news.date,
        "author": news.author,
        "category": news.category,
        "featured": news.featured,
        "image": news.image
    }), 201

# ✅ DELETE: 뉴스 삭제
@bp.route("/<int:news_id>", methods=["DELETE", "OPTIONS"], strict_slashes=False)
def delete_news(news_id):
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    news = News.query.get(news_id)
    if not news:
        return jsonify({"error": "해당 뉴스가 존재하지 않습니다."}), 404

    # 이미지 파일 삭제
    if news.image:
        try:
            os.remove(news.image.lstrip("/"))
        except:
            pass

    db.session.delete(news)
    db.session.commit()
    return jsonify({"message": "뉴스 삭제 완료"}), 200
