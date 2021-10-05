from app import db

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
    rating = db.Column(db.Float)
    naver = db.Column(db.Float)
    daum = db.Column(db.Float)
    watcha = db.Column(db.Float)
    cine21 = db.Column(db.Float)
    
    
    def __init__(self,
                name, 
                screening_date=None, 
                actor=None, 
                director=None, 
                summary=None, 
                running_time=None, 
                poster=None,
                genre=None,
                rating = None,
                naver = None,
                daum = None,
                watcha = None,
                cine21 = None):        
        self.name = name
        self.screening_date = screening_date
        self.actor = actor
        self.director = director
        self.summary = summary
        self.running_time = running_time
        self.poster = poster
        self.genre = genre
        self.rating = rating
        self.naver = naver
        self.daum = daum
        self.watcha = watcha
        self.cine21 = cine21