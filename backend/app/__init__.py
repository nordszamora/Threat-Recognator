from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    from app.routes import blueprint
    CORS(blueprint, supports_credentials=True, resources={r"/api/v1/*": {"origins": "http://localhost:5173"}})
    app.register_blueprint(blueprint, url_prefix='/api/v1')

    return app
