from ..app import db

class Movie(db.Model):
    __tablename__ = "MOVIE"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    screening_date = db.Column(db.Date)
    actor = db.Column(db.String(50))
    director = db.Column(db.String(50))
    summary = db.Column(db.Text)
    running_time = db.Column(db.Integer)
    poster = db.Column(db.String(200))
    genre = db.Column(db.String(50))
    
    def __init__(self,
                name, 
                screening_date=None, 
                actor=None, 
                director=None, 
                summary=None, 
                running_date=None, 
                poster=None,
                genre=None):        
        self.name = name
        self.screening_date = screening_date
        self.actor = actor
        self.director = director
        self.summary = summary
        self.running_date = running_date
        self.poster = poster
        self.genre = genre