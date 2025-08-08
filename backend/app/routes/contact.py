# app/routes/contact.py

from flask import Blueprint, request, jsonify
from app import db
from app.models.contact import ContactMessage

bp = Blueprint("contact", __name__, url_prefix="/api/contact")

@bp.route("", methods=["POST"])
def submit_contact():
    data = request.get_json()
    required = ["name", "email", "subject", "message"]

    if not all(field in data for field in required):
        return jsonify({"error": "필수 항목 누락"}), 400

    contact = ContactMessage(
        name=data["name"],
        email=data["email"],
        subject=data["subject"],
        message=data["message"]
    )
    db.session.add(contact)
    db.session.commit()
    return jsonify({"message": "문의가 접수되었습니다."}), 201
