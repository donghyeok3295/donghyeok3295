# app/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# db.py 대신 여기서는 직접 생성 X → 외부에서 import
from app.db import db  # ✅ 분리된 DB 인스턴스 import

def create_app():
    # ✅ backend/static 을 static 폴더로 지정
    base_dir = os.path.abspath(os.path.dirname(__file__))
    static_folder = os.path.abspath(os.path.join(base_dir, "..", "static"))

    app = Flask(
        __name__,
        static_folder=static_folder,        # 실제 폴더 위치
        static_url_path="/static"           # URL 경로
    )

    # ✅ 환경설정, CORS, DB 초기화
    app.config.from_object("app.config")
    db.init_app(app)
    CORS(app, origins="http://localhost:3000", supports_credentials=True)

    # ✅ Blueprint 등록
    from app.routes.index import bp as index_bp
    from app.routes.news import bp as news_bp
    from app.routes.upload import bp as upload_bp
    from app.routes.members import bp as members_bp
    from app.routes.publications import bp as publications_bp
    from app.routes.contact import bp as contact_bp
    from app.routes import gallery

    app.register_blueprint(index_bp)
    app.register_blueprint(news_bp)
    app.register_blueprint(upload_bp)
    app.register_blueprint(members_bp)
    app.register_blueprint(publications_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(gallery.bp) 

    return app
