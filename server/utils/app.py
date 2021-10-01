from flask import Flask, request, render_template, redirect, url_for

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from flask_mongoengine import MongoEngine

import config

db = SQLAlchemy()
mongodb = MongoEngine()
migrate = Migrate()

def create_app():
    
    from models.movie import 
    
    app = Flask(__name__)
    app.config.from_object(config)
    app.secret_key = "hahaha"

    from .views import user_views, book_views, rental_views
    app.register_blueprint(user_views.bp)
    app.register_blueprint(book_views.bp)
    app.register_blueprint(rental_views.bp)
    
    # ORM
    db.init_app(app)
    migrate.init_app(app, db)

    @app.route('/', methods=['GET'])
    def home():
        return "hello"
    
    
    return app