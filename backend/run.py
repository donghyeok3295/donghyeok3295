# run.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app

app = create_app()

print("\n[DEBUG] 등록된 라우트:")
for rule in app.url_map.iter_rules():
    print(rule)

if __name__ == "__main__":
    app.run(debug=True, port=3001)
