from flask import Blueprint

bp = Blueprint("index", __name__)

@bp.route("/", methods=["GET"])
def index():
    return "✅ IST Lab Flask API 서버 작동 중"
