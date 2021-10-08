from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

def create_app():
    app = Flask(__name__)

    # Blueprints
    from blueprints import aboutus, detail, movie, search, tag
    app.register_blueprint(aboutus.bp)
    app.register_blueprint(detail.bp)
    app.register_blueprint(movie.bp)
    app.register_blueprint(search.bp)
    app.register_blueprint(tag.bp)
    
    # ORM
    db = SQLAlchemy()
    db.init_app(app)
    
    return app

#컨테이너 작성시 0.0.0.0 아이피로 수정필요
if __name__ == "__main__":
    create_app().run(debug=True)