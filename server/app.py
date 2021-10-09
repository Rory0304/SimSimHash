from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import config
import pymysql
pymysql.install_as_MySQLdb()
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    # Blueprints
    from blueprints import aboutus, detail, movie, search, tag
    app.register_blueprint(aboutus.bp)
    app.register_blueprint(detail.bp)
    app.register_blueprint(movie.bp)
    app.register_blueprint(search.bp)
    app.register_blueprint(tag.bp)
    
    # ORM
    db.init_app(app)
    

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', debug=True)
