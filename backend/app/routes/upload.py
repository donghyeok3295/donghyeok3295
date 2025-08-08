from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from flask import send_from_directory

bp = Blueprint("upload", __name__, url_prefix="/api/upload")

# static/uploads 루트 경로
BASE_UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "static", "uploads"))

@bp.route("", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # ✅ section 파라미터 받아서 폴더 분기
    section = request.form.get("section", "common")  # 기본은 common 폴더

    filename = secure_filename(file.filename)
    section_folder = os.path.join(BASE_UPLOAD_FOLDER, section)
    os.makedirs(section_folder, exist_ok=True)

    save_path = os.path.join(section_folder, filename)
    file.save(save_path)

    print(f"✅ 저장 위치: {save_path}")

    # 반환 경로 (프론트에서 <img src>용)
    image_url = f"/static/uploads/{section}/{filename}"
    return jsonify({"imageUrl": image_url}), 200
