from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app import db
from app.models.member import Member
import os

bp = Blueprint("members", __name__, url_prefix="/api/members")

# ✅ GET: 전체 또는 role별 멤버 조회
@bp.route("/", methods=["GET"], strict_slashes=False)
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def get_members():
    role = request.args.get("role")
    query = Member.query
    if role:
        query = query.filter_by(role=role)
    members = query.all()

    return jsonify([
        {
            "id": m.id,
            "name": m.name,
            "role": m.role,
            "image": m.image,
            "email": m.email,
            "github": m.github,
            "research": m.research,
            "graduation": m.graduation,
            "current_position": m.current_position
        } for m in members
    ])

# ✅ POST: 멤버 추가 (프리플라이트 포함)
@bp.route("/", methods=["POST", "OPTIONS"], strict_slashes=False)
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def create_member():
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    data = request.get_json()
    required_fields = ["name", "role"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "필수 항목이 누락되었습니다."}), 400

    member = Member(
        name=data["name"],
        role=data["role"],
        image=data.get("image", ""),
        email=data.get("email", ""),
        github=data.get("github", ""),
        research=data.get("research", ""),
        graduation=data.get("graduation", ""),
        current_position=data.get("current_position", "")
    )
    db.session.add(member)
    db.session.commit()

    return jsonify({
        "message": "멤버 추가 완료",
        "id": member.id,
        "name": member.name,
        "role": member.role,
        "image": member.image,
        "email": member.email,
        "github": member.github,
        "research": member.research,
        "graduation": member.graduation,
        "current_position": member.current_position
    }), 201

# ✅ DELETE: 멤버 삭제 (프리플라이트 포함)
@bp.route("/<int:member_id>", methods=["DELETE", "OPTIONS"], strict_slashes=False)
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def delete_member(member_id):
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    member = Member.query.get(member_id)
    if not member:
        return jsonify({"error": "해당 멤버를 찾을 수 없습니다."}), 404

    # 이미지 파일 삭제
    if member.image:
        image_path = os.path.abspath(os.path.join("static", member.image.lstrip("/static/")))
        if os.path.exists(image_path):
            try:
                os.remove(image_path)
                print(f"🗑 멤버 이미지 삭제됨: {image_path}")
            except Exception as e:
                print(f"⚠ 이미지 삭제 실패: {e}")

    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "삭제 완료"}), 200
