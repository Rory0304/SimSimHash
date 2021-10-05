import mongoengine as mongodb
class Tag(mongodb.Document):
    movie_id = mongodb.IntField(required=True)
    total = mongodb.StringField(Required=True)
    naver = mongodb.StringField(Required=True)
    daum = mongodb.StringField(Required=True)
    watcha = mongodb.StringField(Required=True)
    cine21 = mongodb.StringField(Required=True)
    
    def __init__(self, total, naver, daum, watcha, cine21):
        self.total = total
        self.naver = naver
        self.daum = daum
        self.watcha = watcha
        self.cine21 = cine21
    
    
    def to_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns}
