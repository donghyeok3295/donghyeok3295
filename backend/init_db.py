# backend/init_db.py

from app import create_app, db
from app.models import news
from app.models import member
from app.models import publication
from app.models import gallery
from app.models import contact

app = create_app()

with app.app_context():
    db.create_all()
    print("✅ MySQL 테이블 생성 완료!")
